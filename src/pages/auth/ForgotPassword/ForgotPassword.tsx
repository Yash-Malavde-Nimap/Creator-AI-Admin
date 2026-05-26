import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import styles from './ForgotPassword.module.scss';

interface ForgotForm {
  email: string;
}

export default function ForgotPassword() {
  const [sent, setSent] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotForm>();

  function onSubmit(_data: ForgotForm) {
    // TODO: call password-reset API
    setSent(true);
  }

  if (sent) {
    return (
      <div className={styles.root}>
        <h1 className={styles.heading}>Check your inbox</h1>
        <p className={styles.sub}>
          We sent a password reset link to your email. Follow the link to continue.
        </p>
        <div className={styles.footerRow}>
          <Link to="/login" className={styles.link}>Back to Sign In</Link>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.root}>
      <h1 className={styles.heading}>Forgot password?</h1>
      <p className={styles.sub}>
        Enter your account email and we'll send you a reset link.
      </p>

      <form className={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="fp-email">Email</label>
          <input
            id="fp-email"
            type="email"
            className={styles.input}
            placeholder="admin@example.com"
            autoComplete="email"
            {...register('email', {
              required: 'Email is required',
              pattern: { value: /\S+@\S+\.\S+/, message: 'Enter a valid email' },
            })}
          />
          {errors.email && <span className={styles.error}>{errors.email.message}</span>}
        </div>

        <button type="submit" className={styles.btn} disabled={isSubmitting}>
          {isSubmitting ? 'Sending…' : 'Send Reset Link'}
        </button>
      </form>

      <div className={styles.footerRow}>
        <Link to="/login" className={styles.link}>Back to Sign In</Link>
      </div>
    </div>
  );
}
