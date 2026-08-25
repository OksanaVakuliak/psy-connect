'use client';

import { useRef } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useFormik } from 'formik';
import toast from 'react-hot-toast';
import * as Yup from 'yup';
import { IconLock, IconMail } from '@tabler/icons-react';
import { Button, TextField } from '@/components/ui';
import { getErrorMessage, getErrorStatus, login } from '@/lib/api';
import { useAuthStore } from '@/store/authStore';
import styles from './AuthModal.module.css';

const FIELD_ICON_SIZE = 20;

const INVALID_CREDENTIALS_STATUS = 401;
const INVALID_CREDENTIALS_MESSAGE = 'Invalid email or password.';

const validationSchema = Yup.object({
  email: Yup.string().email('Please enter a valid email').required('Email is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required'),
});

interface LoginFormProps {
  titleId: string;
}

export default function LoginForm({ titleId }: LoginFormProps) {
  const setUser = useAuthStore((state) => state.setUser);
  const closeAuthModal = useAuthStore((state) => state.closeAuthModal);
  const openAuthModal = useAuthStore((state) => state.openAuthModal);
  const isSubmittingRef = useRef(false);

  const { mutate, isPending } = useMutation({
    mutationFn: login,
    onSuccess: ({ user }) => {
      setUser(user);
      closeAuthModal();
    },
    onError: (error) => {
      toast.error(
        getErrorStatus(error) === INVALID_CREDENTIALS_STATUS
          ? INVALID_CREDENTIALS_MESSAGE
          : getErrorMessage(error),
      );
    },
    onSettled: () => {
      isSubmittingRef.current = false;
    },
  });

  const formik = useFormik({
    initialValues: { email: '', password: '' },
    validationSchema,
    onSubmit: (values) => {
      if (isSubmittingRef.current) {
        return;
      }

      isSubmittingRef.current = true;
      mutate(values);
    },
  });

  const fieldError = (field: keyof typeof formik.initialValues) =>
    formik.touched[field] ? formik.errors[field] : undefined;

  return (
    <>
      <div className={styles.header}>
        <h2 className={styles.title} id={titleId}>
          Welcome Back
        </h2>
        <p className={styles.subtitle}>Log in to access your favorites and bookings.</p>
      </div>

      <form className={styles.form} onSubmit={formik.handleSubmit} noValidate>
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
          label="Enter your password"
          type="password"
          icon={<IconLock size={FIELD_ICON_SIZE} />}
          placeholder="Enter your password"
          autoComplete="current-password"
          error={fieldError('password')}
          {...formik.getFieldProps('password')}
        />

        <Button type="submit" fullWidth disabled={isPending}>
          {isPending ? 'Logging in…' : 'Log In'}
        </Button>
      </form>

      <p className={styles.footer}>
        Don&apos;t have an account?{' '}
        <button type="button" className={styles.switch} onClick={() => openAuthModal('register')}>
          Sign Up
        </button>
      </p>
    </>
  );
}
