import { useFormContext } from 'react-hook-form';
import type { FieldConfig } from '../../DynamicForm/types';
import styles from './InputField.module.scss';

/** Optional per-class overrides — any key left out falls back to the default admin style. */
export interface InputFieldClassNames {
  field?: string;
  label?: string;
  inputWrap?: string;
  input?: string;
  errorMsg?: string;
}

export default function InputField({
  config,
  classNames: cx,
}: Readonly<{
  config: FieldConfig;
  classNames?: InputFieldClassNames;
}>) {
  const { register, formState: { errors } } = useFormContext();
  const error = errors[config.name];

  // Merge caller overrides with default module classes
  const cn = {
    field:     cx?.field     ?? styles.field,
    label:     cx?.label     ?? styles.label,
    inputWrap: cx?.inputWrap ?? styles.inputWrap,
    input:     cx?.input     ?? styles.input,
    errorMsg:  cx?.errorMsg  ?? styles.errorMsg,
  };

  return (
    <div className={cn.field}>
      <label className={cn.label}>
        {config.label}
        {config.validation?.required && <span className={styles.required}> *</span>}
      </label>
      <div className={[cn.inputWrap, config.prefix ? styles.hasPrefix : ''].filter(Boolean).join(' ')}>
        {config.prefix && <span className={styles.prefix}>{config.prefix}</span>}
        <input
          type={config.type}
          placeholder={config.placeholder}
          disabled={config.disabled}
          className={[cn.input, error ? styles.hasError : ''].filter(Boolean).join(' ')}
          onWheel={config.type === 'number' ? (e) => e.currentTarget.blur() : undefined}
          {...register(config.name, config.validation)}
        />
        {config.suffix && <span className={styles.suffix}>{config.suffix}</span>}
      </div>
      {config.helpText && !error && <span className={styles.help}>{config.helpText}</span>}
      {error && (
        <span className={cn.errorMsg}>
          {typeof error.message === 'string' ? error.message : ''}
        </span>
      )}
    </div>
  );
}
