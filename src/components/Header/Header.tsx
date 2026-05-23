import {
  MessageCircle,
  ChevronDown,
  ArrowUpDown,
  Download,
  Plus,
  Filter,
} from "lucide-react";
import { useLocation } from "react-router-dom";
import {
  useHeaderContext,
  type PageActions,
} from "../../contexts/HeaderContext";
import styles from "./Header.module.scss";
import NotificationIcon from "../SVGComponents/Header/NotificationIcon";
import UpDownArrowIcon from "../SVGComponents/Header/UpDownArrowIcon";

const titleMap: Record<string, string> = {
  "/dashboard": "DASHBOARD",
  "/users": "USER MANAGEMENT",
  "/subscription": "SUBSCRIPTION",
  "/transaction": "TRANSACTION",
};

// Extend this list to support more action buttons in the future
const ACTION_CONFIG: {
  key: keyof PageActions;
  label: string;
  icon: React.ReactNode;
}[] = [
  {
    key: "onSort",
    label: "Sort",
    icon: <UpDownArrowIcon height={28} width={28} />,
  },
  { key: "onExport", label: "Export", icon: <Download size={15} /> },
  { key: "onAdd", label: "Add", icon: <Plus size={15} /> },
  { key: "onFilter", label: "Filter", icon: <Filter size={15} /> },
];

export default function Header() {
  const { pathname } = useLocation();
  const title = titleMap[pathname] ?? "DASHBOARD";
  const { actions } = useHeaderContext();

  return (
    <header className={styles.header}>
      <h1 className={styles.title}>{title}</h1>

      <div className={styles.actions}>
        {/* Render a button for every action the current page registered */}
        {ACTION_CONFIG.map(({ key, label, icon }) => {
          const handler = actions[key];
          if (!handler) return null;
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
          <div className={styles.avatar} aria-hidden="true">
            SF
          </div>
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
