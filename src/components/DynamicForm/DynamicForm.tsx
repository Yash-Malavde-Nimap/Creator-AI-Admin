import { useForm, FormProvider } from "react-hook-form";
import type { DynamicFormProps, FieldConfig } from "./types";
import InputField from "../FormFields/InputField/InputField";
import TextAreaField from "../FormFields/TextAreaField/TextAreaField";
import SelectField from "../FormFields/SelectField/SelectField";
import CheckboxField from "../FormFields/CheckboxField/CheckboxField";
import SwitchField from "../FormFields/SwitchField/SwitchField";
import FieldArrayField from "../FormFields/FieldArrayField/FieldArrayField";
import PriceCalcField from "../FormFields/PriceCalcField/PriceCalcField";
import styles from "./DynamicForm.module.scss";

function FieldRenderer({ config }: { config: FieldConfig }) {
  switch (config.type) {
    case "text":
    case "email":
    case "password":
    case "number":
    case "date":
      return <InputField config={config} />;
    case "textarea":
      return <TextAreaField config={config} />;
    case "select":
    case "multi-select":
      return <SelectField config={config} />;
    case "checkbox":
      return <CheckboxField config={config} />;
    case "switch":
      return <SwitchField config={config} />;
    case "field-array":
      return <FieldArrayField config={config} />;
    case "price-calc":
      return <PriceCalcField />;
    default:
      return null;
  }
}

export default function DynamicForm({
  formConfig,
  defaultValues = {},
  onSubmit,
  onCancel,
  submitText = "Submit",
  cancelText = "Cancel",
  loading = false,
}: DynamicFormProps) {
  const methods = useForm({ defaultValues, mode: "onTouched" });

  async function handleSubmit(data: Record<string, unknown>) {
    await onSubmit(data);
  }

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(handleSubmit)}
        className={styles.form}
        noValidate
      >
        <div className={styles.grid}>
          {formConfig.map((field) => (
            <div
              key={field.name}
              className={
                field.colSpan === "full" ? styles.colFull : styles.colHalf
              }
            >
              <FieldRenderer config={field} />
            </div>
          ))}
        </div>

        <div className={styles.footer}>
          {onCancel && (
            <button
              type="button"
              className={styles.cancelBtn}
              onClick={onCancel}
              disabled={loading}
            >
              {cancelText}
            </button>
          )}
          <button type="submit" className={styles.submitBtn} disabled={loading}>
            {loading ? <span className={styles.spinner} /> : null}
            {submitText}
          </button>
        </div>
      </form>
    </FormProvider>
  );
}
