'use client';

import { useRef } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useFormik } from 'formik';
import toast from 'react-hot-toast';
import * as Yup from 'yup';
import { IconMail, IconPhone } from '@tabler/icons-react';
import { Button, DateField, SelectField, TextField, UserIcon } from '@/components/ui';
import { TIME_SLOTS, toTwentyFourHourTime } from '@/constants/timeSlots';
import { createAppointment, getErrorMessage } from '@/lib/api';
import { today } from '@/lib/dates';
import styles from './BookingModal.module.css';

const FIELD_ICON_SIZE = 16;

const FULL_NAME_PATTERN = /^\S+(?:\s+\S+)+$/;
const PHONE_PATTERN = /^\+380\d{9}$/;
const MAX_NAME_LENGTH = 100;

const validationSchema = Yup.object({
  name: Yup.string()
    .trim()
    .max(MAX_NAME_LENGTH, `Name must be at most ${MAX_NAME_LENGTH} characters.`)
    .matches(FULL_NAME_PATTERN, 'Please enter your complete full name.')
    .required('Name is required.'),
  email: Yup.string().trim().email('Invalid email format.').required('Email is required.'),
  phone: Yup.string()
    .trim()
    .matches(PHONE_PATTERN, 'Phone number must look like +380XXXXXXXXX.')
    .required('Phone number is required.'),
  date: Yup.string()
    // An empty field is what `required` is for, so the test steps aside and lets it speak.
    .test('not-in-the-past', 'Please pick a date that has not passed.', (value) =>
      value ? value >= today() : true,
    )
    .required('Date is required.'),
  time: Yup.string().required('Please select a time.'),
});

type BookingValues = Yup.InferType<typeof validationSchema>;

interface BookingFormProps {
  psychologistId: string;
  onSuccess: () => void;
  onCancel: () => void;
}

export default function BookingForm({ psychologistId, onSuccess, onCancel }: BookingFormProps) {
  const isSubmittingRef = useRef(false);

  const { mutate, isPending } = useMutation({
    mutationFn: createAppointment,
    onSuccess,
    onError: (error) => toast.error(getErrorMessage(error)),
    onSettled: () => {
      isSubmittingRef.current = false;
    },
  });

  const formik = useFormik<BookingValues>({
    initialValues: { name: '', email: '', phone: '', date: '', time: '' },
    validationSchema,
    onSubmit: ({ name, email, phone, date, time }) => {
      if (isSubmittingRef.current) {
        return;
      }

      isSubmittingRef.current = true;

      mutate({
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        date: new Date(`${date}T${toTwentyFourHourTime(time)}`).toISOString(),
        psychologistId,
      });
    },
  });

  const fieldError = (field: keyof BookingValues) =>
    formik.touched[field] ? formik.errors[field] : undefined;

  return (
    <form className={styles.form} onSubmit={formik.handleSubmit} noValidate>
      <div className={styles.fields}>
        <TextField
          label="Name"
          icon={<UserIcon />}
          placeholder="Enter your full name"
          autoComplete="name"
          error={fieldError('name')}
          {...formik.getFieldProps('name')}
        />

        <TextField
          label="Email"
          type="email"
          icon={<IconMail size={FIELD_ICON_SIZE} />}
          placeholder="Enter your email"
          autoComplete="email"
          error={fieldError('email')}
          {...formik.getFieldProps('email')}
        />

        <TextField
          label="Phone Number"
          type="tel"
          icon={<IconPhone size={FIELD_ICON_SIZE} />}
          placeholder="Enter your phone number"
          autoComplete="tel"
          error={fieldError('phone')}
          {...formik.getFieldProps('phone')}
        />

        <div className={styles.row}>
          <DateField
            label="Date"
            placeholder="Select date"
            value={formik.values.date}
            min={today()}
            error={fieldError('date')}
            onChange={(date) => formik.setFieldValue('date', date)}
            onBlur={() => formik.setFieldTouched('date', true)}
          />

          <SelectField
            label="Time"
            placeholder="Select time"
            options={TIME_SLOTS}
            value={formik.values.time}
            error={fieldError('time')}
            onChange={(time) => formik.setFieldValue('time', time)}
            onBlur={() => formik.setFieldTouched('time', true)}
          />
        </div>
      </div>

      <footer className={styles.footer}>
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>

        <Button type="submit" disabled={isPending}>
          {isPending ? 'Booking…' : 'Confirm Booking'}
        </Button>
      </footer>
    </form>
  );
}
