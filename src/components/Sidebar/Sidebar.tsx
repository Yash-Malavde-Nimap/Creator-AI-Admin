import { NavLink, useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
import { privateRoutes } from "../../routes/routes";
import { removeToken } from "../../utils/auth";
import styles from "./Sidebar.module.scss";
import CreatorLogoIcon from "../SVGComponents/CreatorLogoIcon";

// Derive sidebar items at module level — stable reference, no re-computation on render.
const sidebarItems = Object.values(privateRoutes).filter(
  (route) => route.sidebar?.show,
);

export default function Sidebar() {
  const navigate = useNavigate();

  function handleLogout() {
    removeToken();
    navigate("/login", { replace: true });
  }

  return (
    <aside className={styles.sidebar}>
      <div className={styles.logo}>
        <CreatorLogoIcon color="#D9D9D9" width={100} />
      </div>

      <nav className={styles.nav}>
        {sidebarItems.map((route) => {
          // Non-null asserted: we already filtered for sidebar.show === true
          const Icon = route.sidebar!.icon!;
          // sidebar.label overrides pageName for shorter nav text
          const label = route.sidebar!.label ?? route.pageName;
          return (
            <NavLink
              key={route.path}
              to={route.path}
              className={({ isActive }) =>
                [styles.navItem, isActive ? styles.active : ""]
                  .filter(Boolean)
                  .join(" ")
              }
            >
              <Icon size={16} />
              <span>{label}</span>
            </NavLink>
          );
        })}
      </nav>

      <button className={styles.logout} onClick={handleLogout}>
        <LogOut size={15} />
        <span>LOGOUT</span>
      </button>
    </aside>
  );
}
