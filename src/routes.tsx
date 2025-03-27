import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import {
  RouteProtected,
  RouteProtectedCode,
  RouteProtectedHome,
  RouteProtectedResetPassword,
} from "./components/ProtectedRoute";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import VerifyCodePage from "./pages/VerifyCodePage";
import ResetPasswordPage from "./pages/ResetPasswordPage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path="/login"
        element={
          <RouteProtectedHome>
            <LoginPage />
          </RouteProtectedHome>
        }
      />
      <Route
        path="/"
        element={
          <RouteProtected>
            <HomePage />
          </RouteProtected>
        }
      />
      <Route
        path="/register"
        element={
          <RouteProtectedHome>
            <RegisterPage />
          </RouteProtectedHome>
        }
      />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route
        path="/verify-code"
        element={
          <RouteProtectedCode>
            <VerifyCodePage />
          </RouteProtectedCode>
        }
      />
      <Route
        path="/reset-password"
        element={
          <RouteProtectedResetPassword>
            <ResetPasswordPage />
          </RouteProtectedResetPassword>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
