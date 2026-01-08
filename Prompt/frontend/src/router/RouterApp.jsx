import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Layout } from "../components/layout/Layout";
import { AuthPage } from "../pages/AuthPage";
import { Home } from "../pages/Home";
import { Tutorial } from "../pages/Tutorial";
import { Dashboard } from "../pages/Dashboard";
import ForgotPassword from "../pages/ForgotPassword";
import ResetPassword from "../pages/ResetPassword";
import VerifyEmail from "../pages/VerifyEmail";
import { ProtectedRoute } from "../components/auth/ProtectedRoute";

export function RouterApp() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/verify-email/:token" element={<VerifyEmail />} />
        <Route path="/mis-tareas"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>}
        />
        <Route path="/tutorial" element={<Tutorial />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

