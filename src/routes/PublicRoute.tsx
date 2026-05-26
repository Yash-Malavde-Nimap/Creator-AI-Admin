import { Navigate, Outlet } from 'react-router-dom';
import { isAuthenticated } from '../utils/auth';

/**
 * Wraps all pre-login routes (Login, ForgotPassword, etc.).
 * Already authenticated → bounces to /dashboard so the user never sees auth pages again.
 * Not authenticated    → renders the nested layout + page via <Outlet />.
 */
export default function PublicRoute() {
  return isAuthenticated() ? <Navigate to="/dashboard" replace /> : <Outlet />;
}
