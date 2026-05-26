import { Outlet } from 'react-router-dom';
import Sidebar from '../../components/Sidebar/Sidebar';
import Header from '../../components/Header/Header';
import { HeaderProvider } from '../../contexts/HeaderContext';
import styles from './PostLoginLayout.module.scss';

/**
 * PostLoginLayout — the main admin shell rendered for all protected routes.
 * Structure: fixed Sidebar | scrollable right panel (sticky Header + page content).
 * HeaderProvider wraps the layout so both Header and page components share action state.
 */
export default function PostLoginLayout() {
  return (
    <HeaderProvider>
      <div className={styles.layout}>
        <div className={styles.sidebar}>
          <Sidebar />
        </div>
        <div className={styles.rightPanel}>
          <Header />
          <main className={styles.content}>
            <Outlet />
          </main>
        </div>
      </div>
    </HeaderProvider>
  );
}
