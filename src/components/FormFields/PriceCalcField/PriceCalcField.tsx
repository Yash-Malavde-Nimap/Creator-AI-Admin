import { useWatch, useFormContext } from "react-hook-form";
import styles from "./PriceCalcField.module.scss";

export default function PriceCalcField() {
  const { control } = useFormContext();
  const price = useWatch({ control, name: "pricePerMonth" }) ?? 0;
  const discount = useWatch({ control, name: "annualDiscount" }) ?? 0;

  if (!price || price <= 0) return null;

  const monthly12 = price * 12;
  const annual12 = monthly12 * (1 - discount / 100);
  const savings = monthly12 - annual12;

  return (
    <div className={styles.block}>
      <div className={styles.row}>
        <span>Monthly (For 12 Mo.)</span>
        <span>€ {Number.isNaN(monthly12) ? "0.00" : monthly12.toFixed(2)}</span>
      </div>

      <div className={styles.row}>
        <span>Annually (For 12 Mo.)</span>
        <span>€ {Number.isNaN(annual12) ? "0.00" : annual12.toFixed(2)}</span>
      </div>

      <div className={[styles.row, styles.savings].join(" ")}>
        <span>Annual Savings</span>
        <span>-€ {Number.isNaN(savings) ? "0.00" : savings.toFixed(2)}</span>
      </div>
    </div>
  );
}
