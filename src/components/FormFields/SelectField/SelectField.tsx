import { useFormContext, Controller } from 'react-hook-form';
import ReactSelect from 'react-select';
import type { FieldConfig, FieldOption } from '../../DynamicForm/types';
import { buildSelectStyles } from '../../Select/selectStyles';
import styles from './SelectField.module.scss';

export default function SelectField({ config }: { config: FieldConfig }) {
  const { control, formState: { errors } } = useFormContext();
  const error = errors[config.name];
  const isMulti = config.type === 'multi-select';

  return (
    <div className={styles.field}>
      <label className={styles.label}>
        {config.label}
        {config.validation?.required && <span className={styles.required}> *</span>}
      </label>
      <Controller
        name={config.name}
        control={control}
        rules={config.validation}
        render={({ field }) => (
          <ReactSelect<FieldOption, boolean>
            options={config.options ?? []}
            value={field.value ?? null}
            onChange={field.onChange}
            onBlur={field.onBlur}
            isMulti={isMulti}
            placeholder={config.placeholder ?? 'Select…'}
            isDisabled={config.disabled}
            styles={buildSelectStyles() as never}
            classNamePrefix="rs"
            menuPosition="fixed"
            menuPortalTarget={document.body}
          />
        )}
      />
      {error && <span className={styles.errorMsg}>{String(error.message)}</span>}
    </div>
  );
}
