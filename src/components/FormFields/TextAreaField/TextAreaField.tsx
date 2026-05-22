import { useFormContext } from 'react-hook-form';
import type { FieldConfig } from '../../DynamicForm/types';
import styles from './TextAreaField.module.scss';

export default function TextAreaField({ config }: { config: FieldConfig }) {
  const { register, formState: { errors } } = useFormContext();
  const error = errors[config.name];

  return (
    <div className={styles.field}>
      <label className={styles.label}>
        {config.label}
        {config.validation?.required && <span className={styles.required}> *</span>}
      </label>
      <textarea
        placeholder={config.placeholder}
        disabled={config.disabled}
        rows={config.rows ?? 4}
        className={[styles.textarea, error ? styles.hasError : ''].join(' ')}
        {...register(config.name, config.validation)}
      />
      {config.helpText && !error && <span className={styles.help}>{config.helpText}</span>}
      {error && <span className={styles.errorMsg}>{String(error.message)}</span>}
    </div>
  );
}
