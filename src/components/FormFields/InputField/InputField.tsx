import { useFormContext } from 'react-hook-form';
import type { FieldConfig } from '../../DynamicForm/types';
import styles from './InputField.module.scss';

export default function InputField({ config }: { config: FieldConfig }) {
  const { register, formState: { errors } } = useFormContext();
  const error = errors[config.name];

  return (
    <div className={styles.field}>
      <label className={styles.label}>
        {config.label}
        {config.validation?.required && <span className={styles.required}> *</span>}
      </label>
      <div className={[styles.inputWrap, config.prefix ? styles.hasPrefix : ''].join(' ')}>
        {config.prefix && <span className={styles.prefix}>{config.prefix}</span>}
        <input
          type={config.type}
          placeholder={config.placeholder}
          disabled={config.disabled}
          className={[styles.input, error ? styles.hasError : ''].join(' ')}
          onWheel={config.type === 'number' ? (e) => e.currentTarget.blur() : undefined}
          {...register(config.name, config.validation)}
        />
        {config.suffix && <span className={styles.suffix}>{config.suffix}</span>}
      </div>
      {config.helpText && !error && <span className={styles.help}>{config.helpText}</span>}
      {error && <span className={styles.errorMsg}>{String(error.message)}</span>}
    </div>
  );
}
