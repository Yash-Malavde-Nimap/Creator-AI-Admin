/**
 * Single source of truth for every route in the application.
 *
 * Rules:
 *  - All page components are lazy-loaded (React.lazy + Suspense in AppRouter).
 *  - publicRoutes  → rendered inside PreLoginLayout, guarded by PublicRoute.
 *  - privateRoutes → rendered inside PostLoginLayout, guarded by PrivateRoute.
 *  - Sidebar and Header read this file directly; never hardcode routes elsewhere.
 */

import { lazy } from 'react';
import {
  LayoutDashboard,
  Users as UsersIcon,
  CreditCard,
  ArrowLeftRight,
} from 'lucide-react';
import type { PublicRouteConfig, PrivateRouteConfig } from '../types/routes';

// ── Auth pages ────────────────────────────────────────────────────────────────
const Login         = lazy(() => import('../pages/auth/Login/Login'));
const ForgotPassword = lazy(() => import('../pages/auth/ForgotPassword/ForgotPassword'));
const CreatePassword = lazy(() => import('../pages/auth/CreatePassword/CreatePassword'));
const ResetPassword  = lazy(() => import('../pages/auth/ResetPassword/ResetPassword'));

// ── App pages ─────────────────────────────────────────────────────────────────
const Dashboard    = lazy(() => import('../pages/Dashboard/Dashboard'));
const UsersPage    = lazy(() => import('../pages/Users/Users'));
const Subscription = lazy(() => import('../pages/Subscription/Subscription'));
const Transaction  = lazy(() => import('../pages/Transaction/Transaction'));

// ─────────────────────────────────────────────────────────────────────────────
// PUBLIC ROUTES
// ─────────────────────────────────────────────────────────────────────────────

export const publicRoutes: Record<string, PublicRouteConfig> = {
  LOGIN: {
    path: '/login',
    element: <Login />,
  },
  FORGOT_PASSWORD: {
    path: '/forgot-password',
    element: <ForgotPassword />,
  },
  CREATE_PASSWORD: {
    path: '/create-password',
    element: <CreatePassword />,
  },
  RESET_PASSWORD: {
    path: '/reset-password',
    element: <ResetPassword />,
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// PRIVATE ROUTES
// ─────────────────────────────────────────────────────────────────────────────

export const privateRoutes: Record<string, PrivateRouteConfig> = {
  DASHBOARD: {
    path: '/dashboard',
    element: <Dashboard />,
    pageName: 'DASHBOARD',
    sidebar: {
      show: true,
      icon: LayoutDashboard,
      // label omitted → defaults to pageName
    },
    navbarCom: {
      search: false,
      sort: false,
      export: false,
      add: false,
    },
    permissionName: 'fetch_dashboard',
  },

  USERS: {
    path: '/users',
    element: <UsersPage />,
    pageName: 'USER MANAGEMENT',
    sidebar: {
      show: true,
      icon: UsersIcon,
      label: 'USERS', // shorter label for the sidebar nav item
    },
    navbarCom: {
      search: true,
      sort: true,
      add: true,
    },
    permissionName: 'fetch_users',
  },

  SUBSCRIPTION: {
    path: '/subscription',
    element: <Subscription />,
    pageName: 'SUBSCRIPTION',
    sidebar: {
      show: true,
      icon: CreditCard,
    },
    navbarCom: {
      search: true,
      sort: true,
      add: true,
    },
    permissionName: 'fetch_subscription',
  },

  TRANSACTION: {
    path: '/transaction',
    element: <Transaction />,
    pageName: 'TRANSACTION',
    sidebar: {
      show: true,
      icon: ArrowLeftRight,
    },
    navbarCom: {
      search: true,
      sort: true,
    },
    permissionName: 'fetch_transaction',
  },
};
