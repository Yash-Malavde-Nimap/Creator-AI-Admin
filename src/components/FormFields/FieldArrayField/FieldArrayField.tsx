import { useFormContext, useFieldArray } from 'react-hook-form';
import { X } from 'lucide-react';
import type { FieldConfig } from '../../DynamicForm/types';
import styles from './FieldArrayField.module.scss';

export default function FieldArrayField({ config }: { config: FieldConfig }) {
  const { control, register } = useFormContext();
  const { fields, append, remove } = useFieldArray({ control, name: config.name });

  return (
    <div className={styles.section}>
      {config.label && <h3 className={styles.title}>{config.label}</h3>}
      <div className={styles.list}>
        {fields.map((field, index) => (
          <div key={field.id} className={styles.row}>
            <span className={styles.num}>{index + 1}.</span>
            <input
              type="text"
              placeholder={config.itemPlaceholder ?? ''}
              className={styles.input}
              {...register(`${config.name}.${index}.text` as const)}
            />
            {fields.length > 1 && (
              <button
                type="button"
                className={styles.removeBtn}
                onClick={() => remove(index)}
                aria-label="Remove item"
              >
                <X size={14} />
              </button>
            )}
          </div>
        ))}
      </div>
      <button
        type="button"
        className={styles.addMore}
        onClick={() => append({ text: '' })}
      >
        {config.addButtonLabel ?? '+ Add'}
      </button>
    </div>
  );
}
