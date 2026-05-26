import type { ReactNode } from 'react';
import {
  MessageCircle,
  ChevronDown,
  Download,
  Plus,
  Filter,
} from 'lucide-react';
import { useLocation } from 'react-router-dom';
import {
  useHeaderContext,
  type PageActions,
} from '../../contexts/HeaderContext';
import { privateRoutes } from '../../routes/routes';
import type { NavbarConfig } from '../../types/routes';
import styles from './Header.module.scss';
import Avatar from '../Avatar/Avatar';
import NotificationIcon from '../SVGComponents/Header/NotificationIcon';
import UpDownArrowIcon from '../SVGComponents/Header/UpDownArrowIcon';

/**
 * Each entry wires a HeaderContext action key to:
 *   - the button's aria-label and icon
 *   - the navbarCom key that can suppress the button (when set to false)
 */
const ACTION_CONFIG: {
  key: keyof PageActions;
  label: string;
  icon: ReactNode;
  navbarKey: keyof NavbarConfig;
}[] = [
  {
    key: 'onSort',
    label: 'Sort',
    icon: <UpDownArrowIcon height={28} width={28} />,
    navbarKey: 'sort',
  },
  { key: 'onExport', label: 'Export', icon: <Download size={15} />, navbarKey: 'export' },
  { key: 'onAdd',    label: 'Add',    icon: <Plus size={15} />,     navbarKey: 'add'    },
  { key: 'onFilter', label: 'Filter', icon: <Filter size={15} />,   navbarKey: 'filter' },
];

export default function Header() {
  const { pathname } = useLocation();
  const { actions } = useHeaderContext();

  // Look up the current page's route config from the central registry
  const currentRoute = Object.values(privateRoutes).find((r) => r.path === pathname);
  const title     = currentRoute?.pageName ?? 'DASHBOARD';
  const navbarCom = currentRoute?.navbarCom;

  // navbarCom.export can be a static callback — merge it with any page-registered handler,
  // giving precedence to the static route-level function.
  const exportHandler =
    typeof navbarCom?.export === 'function' ? navbarCom.export : actions.onExport;

  const mergedActions: PageActions = { ...actions, onExport: exportHandler };

  return (
    <header className={styles.header}>
      <h1 className={styles.title}>{title}</h1>

      <div className={styles.actions}>
        {ACTION_CONFIG.map(({ key, label, icon, navbarKey }) => {
          const handler = mergedActions[key];
          if (!handler) return null;
          // Suppress the button when navbarCom explicitly sets the flag to false
          if (navbarCom?.[navbarKey] === false) return null;
          return (
            <button
              key={key}
              className={styles.actionBtn}
              onClick={handler}
              aria-label={label}
            >
              {icon}
            </button>
          );
        })}

        <button className={styles.actionBtn} aria-label="Notifications">
          <NotificationIcon height={22} width={22} />
        </button>

        <div className={styles.userMenu}>
          <Avatar content="SF" />
          <div className={styles.userInfo}>
            <span className={styles.userName}>Simon Finntoff</span>
            <span className={styles.userEmail}>siminfintoff@gmail.com</span>
          </div>
          <ChevronDown size={14} className={styles.chevron} />
        </div>
      </div>
    </header>
  );
}
