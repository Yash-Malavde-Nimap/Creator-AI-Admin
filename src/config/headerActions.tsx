import type { ReactNode } from 'react';
import styles from '../components/Header/Header.module.scss';
import UpDownArrowIcon from '../components/SVGComponents/Header/UpDownArrowIcon';

// Each route maps to a factory that returns the button node.
// The Header calls the factory and passes in the handler registered by the page.
// If no handler is registered the button still renders (disabled/no-op).
const headerActionMap: Record<string, (onClick?: () => void) => ReactNode> = {
  '/users': (onClick) => (
    <button className={styles.actionBtn} onClick={onClick} aria-label="Sort">
      <UpDownArrowIcon height={28} width={28} />
    </button>
  ),
};

export default headerActionMap;
