import { Pencil } from "lucide-react";
import Toggle from "../../components/Toggle/Toggle";
import type { SubscriptionPlan } from "../../types/subscription";
import styles from "../../pages/Subscription/Subscription.module.scss";

interface ActionCellProps {
  row: SubscriptionPlan;
  onToggle?: (id: string) => void;
  onEdit?: (row: SubscriptionPlan) => void;
}

export default function ActionCell({
  row,
  onToggle,
  onEdit,
}: Readonly<ActionCellProps>) {
  return (
    <div className={styles.actionCell}>
      {onEdit && (
        <button
          onClick={() => onEdit(row)}
          className={styles.editBtn}
          aria-label={`Edit ${row.name}`}
        >
          <Pencil size={15} />
        </button>
      )}
      {onToggle && (
        <Toggle checked={row.is_active} onChange={() => onToggle(row.id)} />
      )}
    </div>
  );
}
