import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  CreditCard,
  ArrowLeftRight,
  LogOut,
  Sparkles,
} from 'lucide-react';
import styles from './Sidebar.module.scss';

const navItems = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'DASHBOARD' },
  { to: '/users', icon: Users, label: 'USERS' },
  { to: '/subscription', icon: CreditCard, label: 'SUBSCRIPTION' },
  { to: '/transaction', icon: ArrowLeftRight, label: 'TRANSACTION' },
];

export default function Sidebar() {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.logo}>
        <Sparkles size={16} className={styles.logoIcon} />
        <span>Creator AI</span>
      </div>

      <nav className={styles.nav}>
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              [styles.navItem, isActive ? styles.active : ''].filter(Boolean).join(' ')
            }
          >
            <Icon size={16} />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>

      <button className={styles.logout}>
        <LogOut size={15} />
        <span>LOGOUT</span>
      </button>
    </aside>
  );
}
