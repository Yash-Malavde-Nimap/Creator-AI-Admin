import { Outlet } from 'react-router-dom';
import Sidebar from '../../components/Sidebar/Sidebar';
import Header from '../../components/Header/Header';
import { HeaderProvider } from '../../contexts/HeaderContext';
import styles from './AdminLayout.module.scss';

export default function AdminLayout() {
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
