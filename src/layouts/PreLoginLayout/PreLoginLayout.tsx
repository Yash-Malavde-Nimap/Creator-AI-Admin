import { Outlet } from "react-router-dom";
import styles from "./PreLoginLayout.module.scss";
import CreatorLogoIcon from "../../components/SVGComponents/CreatorLogoIcon";

/**
 * PreLoginLayout — minimal centered shell for all auth pages.
 * No sidebar, no header. Renders the brand mark above the auth card.
 * If the user is already authenticated, PublicRoute redirects before this renders.
 */
export default function PreLoginLayout() {
  return (
    <div className={styles.layout}>
      <div className={styles.card}>
        <div className={styles.brand}>
          <CreatorLogoIcon color="white"  />
        </div>
        <Outlet />
      </div>
    </div>
  );
}
