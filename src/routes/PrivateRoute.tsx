import { Navigate, Outlet } from 'react-router-dom';
import { isAuthenticated } from '../utils/auth';

/**
 * Wraps all post-login routes.
 * Authenticated  → renders the nested layout + page via <Outlet />.
 * Unauthenticated → hard-redirects to /login.
 */
export default function PrivateRoute() {
  return isAuthenticated() ? <Outlet /> : <Navigate to="/login" replace />;
}
