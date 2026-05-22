import type { ReactNode } from 'react';
import { ArrowUpDown } from 'lucide-react';
import styles from '../components/Header/Header.module.scss';

// Each route maps to a factory that returns the button node.
// The Header calls the factory and passes in the handler registered by the page.
// If no handler is registered the button still renders (disabled/no-op).
const headerActionMap: Record<string, (onClick?: () => void) => ReactNode> = {
  '/users': (onClick) => (
    <button className={styles.actionBtn} onClick={onClick} aria-label="Sort">
      <ArrowUpDown size={15} />
    </button>
  ),
};

export default headerActionMap;
