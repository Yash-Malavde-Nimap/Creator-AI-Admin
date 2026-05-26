import { Pencil } from "lucide-react";
import Toggle from "../../components/Toggle/Toggle";
import type { Plan } from "../../pages/Subscription/Subscription";
import styles from "../../pages/Subscription/Subscription.module.scss";

interface ActionCellProps {
  row: Plan;
  onToggle?: (id: number) => void;
  onEdit?: (row: any) => void;
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
          aria-label={`Edit ${row.planName}`}
        >
          <Pencil size={15} />
        </button>
      )}
      {onToggle && (
        <Toggle checked={row.active} onChange={() => onToggle(row.id)} />
      )}
    </div>
  );
}
