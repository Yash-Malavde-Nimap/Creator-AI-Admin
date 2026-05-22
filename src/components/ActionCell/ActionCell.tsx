import { Pencil } from "lucide-react";
import Toggle from "../../components/Toggle/Toggle";
import type { Plan } from "../../pages/Subscription/Subscription";
import styles from "../../pages/Subscription/Subscription.module.scss";

export default function ActionCell({
  row,
  onToggle,
}: {
  row: Plan;
  onToggle: (id: number) => void;
}) {
  return (
    <div className={styles.actionCell}>
      <button className={styles.editBtn} aria-label={`Edit ${row.planName}`}>
        <Pencil size={15} />
      </button>
      <Toggle checked={row.active} onChange={() => onToggle(row.id)} />
    </div>
  );
}
