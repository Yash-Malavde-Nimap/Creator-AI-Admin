import type { ComponentType, ReactElement } from 'react';

// ── Sidebar slot ──────────────────────────────────────────────────────────────
// Drives which nav items appear in the Sidebar and how they look.
export interface SidebarConfig {
  show: boolean;
  /** Lucide-compatible icon component */
  icon?: ComponentType<{ size?: number | string; className?: string }>;
  /** Sidebar label — overrides pageName when set */
  label?: string;
}

// ── Navbar slot ───────────────────────────────────────────────────────────────
// Declares which action buttons the Header should expose for this route.
// Boolean true  = button is available (page registers handler via HeaderContext).
// Boolean false = button is suppressed even if a handler is registered.
// Function      = button wires directly to the provided callback (no HeaderContext needed).
export interface NavbarConfig {
  search?: boolean;
  sort?: boolean;
  /** true | false | static export callback */
  export?: boolean | (() => void);
  add?: boolean;
  filter?: boolean;
  /** Renders a message/chat icon button */
  sendMessage?: boolean;
}

// ── Route shapes ──────────────────────────────────────────────────────────────

export interface PublicRouteConfig {
  path: string;
  element: ReactElement;
}

export interface PrivateRouteConfig {
  path: string;
  element: ReactElement;
  /** Displayed in the Header as the page title */
  pageName: string;
  sidebar?: SidebarConfig;
  navbarCom?: NavbarConfig;
  /** Permission key — used by RBAC checks (future) */
  permissionName?: string;
}
