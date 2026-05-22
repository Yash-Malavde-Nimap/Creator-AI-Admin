import { useFormContext } from 'react-hook-form';
import type { FieldConfig } from '../../DynamicForm/types';
import styles from './CheckboxField.module.scss';

export default function CheckboxField({ config }: { config: FieldConfig }) {
  const { register, formState: { errors } } = useFormContext();
  const error = errors[config.name];

  return (
    <div className={styles.field}>
      <label className={styles.checkLabel}>
        <input
          type="checkbox"
          className={styles.checkbox}
          disabled={config.disabled}
          {...register(config.name, config.validation)}
        />
        <span className={styles.labelText}>
          {config.label}
          {config.validation?.required && <span className={styles.required}> *</span>}
        </span>
      </label>
      {config.helpText && !error && <span className={styles.help}>{config.helpText}</span>}
      {error && <span className={styles.errorMsg}>{String(error.message)}</span>}
    </div>
  );
}
