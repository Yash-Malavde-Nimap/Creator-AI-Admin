import { TrendingUp } from 'lucide-react';
import type { ReactNode } from 'react';
import styles from './StatCard.module.scss';

interface StatCardProps {
  label: string;
  value: string;
  stat: string;
  statType?: 'positive' | 'neutral' | 'negative';
  icon: ReactNode;
}

export default function StatCard({
  label,
  value,
  stat,
  statType = 'neutral',
  icon,
}: Readonly<StatCardProps>) {
  return (
    <div className={styles.card}>
      <div className={styles.top}>
        <span className={styles.label}>{label}</span>
        <div className={styles.iconWrap}>{icon}</div>
      </div>
      <div className={styles.value}>{value}</div>
      <div className={[styles.stat, styles[statType]].join(' ')}>
        {statType === 'positive' && stat.startsWith('+') && <TrendingUp size={12} />}
        <span>{stat}</span>
      </div>
    </div>
  );
}
