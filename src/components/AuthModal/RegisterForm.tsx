'use client';

import { useRef } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useFormik } from 'formik';
import toast from 'react-hot-toast';
import * as Yup from 'yup';
import { IconLock, IconMail, IconUser } from '@tabler/icons-react';
import { Button, TextField } from '@/components/ui';
import { getErrorMessage, getErrorStatus, register } from '@/lib/api';
import { useAuthStore } from '@/store/authStore';
import styles from './AuthModal.module.css';

const EMAIL_TAKEN_STATUS = 409;
const EMAIL_TAKEN_MESSAGE = 'An account with this email already exists.';

const validationSchema = Yup.object({
  name: Yup.string()
    .trim()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be at most 50 characters')
    .required('Name is required'),
  email: Yup.string().email('Please enter a valid email').required('Email is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .max(64, 'Password must be at most 64 characters')
    .required('Password is required'),
});

interface RegisterFormProps {
  titleId: string;
}

export default function RegisterForm({ titleId }: RegisterFormProps) {
  const setUser = useAuthStore((state) => state.setUser);
  const closeAuthModal = useAuthStore((state) => state.closeAuthModal);
  const openAuthModal = useAuthStore((state) => state.openAuthModal);
  const isSubmittingRef = useRef(false);

  const { mutate, isPending } = useMutation({
    mutationFn: register,
    onSuccess: ({ user }) => {
      setUser(user);
      closeAuthModal();
    },
    onError: (error) => {
      toast.error(
        getErrorStatus(error) === EMAIL_TAKEN_STATUS ? EMAIL_TAKEN_MESSAGE : getErrorMessage(error),
      );
    },
    onSettled: () => {
      isSubmittingRef.current = false;
    },
  });

  const formik = useFormik({
    initialValues: { name: '', email: '', password: '' },
    validationSchema,
    onSubmit: ({ name, email, password }) => {
      if (isSubmittingRef.current) {
        return;
      }

      isSubmittingRef.current = true;
      mutate({ name: name.trim(), email, password });
    },
  });

  const fieldError = (field: keyof typeof formik.initialValues) =>
    formik.touched[field] ? formik.errors[field] : undefined;

  return (
    <>
      <div className={styles.header}>
        <h2 className={styles.title} id={titleId}>
          Create an Account
        </h2>
        <p className={styles.subtitle}>
          Join PsyConnect to save your favorite specialists and book sessions.
        </p>
      </div>

      <form className={styles.form} onSubmit={formik.handleSubmit} noValidate>
        <TextField
          label="Name"
          icon={IconUser}
          placeholder="Enter your name"
          autoComplete="name"
          error={fieldError('name')}
          {...formik.getFieldProps('name')}
        />

        <TextField
          label="Email"
          type="email"
          icon={IconMail}
          placeholder="Enter your email"
          autoComplete="email"
          error={fieldError('email')}
          {...formik.getFieldProps('email')}
        />

        <TextField
          label="Create a password"
          type="password"
          icon={IconLock}
          placeholder="Enter your password"
          autoComplete="new-password"
          error={fieldError('password')}
          {...formik.getFieldProps('password')}
        />

        <Button type="submit" fullWidth disabled={isPending}>
          {isPending ? 'Signing up…' : 'Sign Up'}
        </Button>
      </form>

      <p className={styles.footer}>
        Already have an account?{' '}
        <button type="button" className={styles.switch} onClick={() => openAuthModal('login')}>
          Log In
        </button>
      </p>
    </>
  );
}
