import { Routes, Route } from "react-router-dom";

import LandingPage from "../pages/public/LandingPage";
import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";
import DashboardPage from "../pages/dashboard/DashboardPage";
import MyFilesPage from "../pages/files/MyFilesPage";
import ProtectedRoute from "./ProtectedRoute";
import MySharesPage from "../pages/shares/MySharesPage";
import PublicSharePage from "../pages/public/PublicSharePage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={<LandingPage />}
      />

      <Route
        path="/login"
        element={<LoginPage />}
      />

      <Route
        path="/register"
        element={<RegisterPage />}
      />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/files"
        element={
            <ProtectedRoute>
            <MyFilesPage />
            </ProtectedRoute>
        }
        />

       <Route
        path="/shares"
        element={
            <ProtectedRoute>
            <MySharesPage />
            </ProtectedRoute>
        }
        />

       <Route
        path="/share/:token"
        element={
            <PublicSharePage />
        }
        />
    
    </Routes>
  );
};

export default AppRoutes;