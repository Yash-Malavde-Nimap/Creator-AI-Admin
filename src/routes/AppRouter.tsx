/**
 * AppRouter — builds the entire route tree from the centralized route registry.
 *
 * Tree shape:
 *   /                        → redirect to /dashboard
 *   PublicRoute (guard)
 *     PreLoginLayout
 *       /login, /forgot-password, /create-password, /reset-password
 *   PrivateRoute (guard)
 *     PostLoginLayout
 *       /dashboard, /users, /subscription, /transaction
 *   * → redirect to /dashboard
 */

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Suspense } from "react";
import { publicRoutes, privateRoutes } from "./routes";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
import PreLoginLayout from "../layouts/PreLoginLayout/PreLoginLayout";
import PostLoginLayout from "../layouts/PostLoginLayout/PostLoginLayout";
import Loader from "../components/Loader/Loader";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loader />}>
        <Routes>
          {/* Root redirect */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />

          {/* ── Pre-login (public) routes ─────────────────────────────── */}
          <Route element={<PublicRoute />}>
            <Route element={<PreLoginLayout />}>
              {Object.values(publicRoutes).map(({ path, element }) => (
                <Route key={path} path={path} element={element} />
              ))}
            </Route>
          </Route>

          {/* ── Post-login (private) routes ───────────────────────────── */}
          <Route element={<PrivateRoute />}>
            <Route element={<PostLoginLayout />}>
              {Object.values(privateRoutes).map(({ path, element }) => (
                <Route key={path} path={path} element={element} />
              ))}
            </Route>
          </Route>

          {/* Catch-all */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
