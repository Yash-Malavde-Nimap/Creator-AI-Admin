import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import styles from './CreatePassword.module.scss';

interface CreatePasswordForm {
  password: string;
  confirmPassword: string;
}

export default function CreatePassword() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<CreatePasswordForm>();

  const passwordValue = watch('password', '');

  function onSubmit(_data: CreatePasswordForm) {
    // TODO: call create-password API with token from URL params
    navigate('/login', { replace: true });
  }

  return (
    <div className={styles.root}>
      <h1 className={styles.heading}>Create password</h1>
      <p className={styles.sub}>Choose a strong password for your account.</p>

      <form className={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="cp-password">New Password</label>
          <input
            id="cp-password"
            type="password"
            className={styles.input}
            placeholder="••••••••"
            autoComplete="new-password"
            {...register('password', {
              required: 'Password is required',
              minLength: { value: 8, message: 'Minimum 8 characters' },
            })}
          />
          {errors.password && <span className={styles.error}>{errors.password.message}</span>}
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="cp-confirm">Confirm Password</label>
          <input
            id="cp-confirm"
            type="password"
            className={styles.input}
            placeholder="••••••••"
            autoComplete="new-password"
            {...register('confirmPassword', {
              required: 'Please confirm your password',
              validate: (v) => v === passwordValue || 'Passwords do not match',
            })}
          />
          {errors.confirmPassword && (
            <span className={styles.error}>{errors.confirmPassword.message}</span>
          )}
        </div>

        <button type="submit" className={styles.btn} disabled={isSubmitting}>
          {isSubmitting ? 'Creating…' : 'Create Password'}
        </button>
      </form>

      <div className={styles.footerRow}>
        <Link to="/login" className={styles.link}>Back to Sign In</Link>
      </div>
    </div>
  );
}
