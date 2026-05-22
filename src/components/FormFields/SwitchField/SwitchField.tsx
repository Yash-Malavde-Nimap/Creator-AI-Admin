import { useFormContext, Controller } from 'react-hook-form';
import Toggle from '../../Toggle/Toggle';
import type { FieldConfig } from '../../DynamicForm/types';
import styles from './SwitchField.module.scss';

export default function SwitchField({ config }: { config: FieldConfig }) {
  const { control } = useFormContext();

  return (
    <div className={styles.field}>
      <Controller
        name={config.name}
        control={control}
        rules={config.validation}
        render={({ field }) => (
          <div className={styles.row}>
            <div>
              <span className={styles.label}>{config.label}</span>
              {config.helpText && <p className={styles.help}>{config.helpText}</p>}
            </div>
            <Toggle
              checked={!!field.value}
              onChange={field.onChange}
              disabled={config.disabled}
            />
          </div>
        )}
      />
    </div>
  );
}
