import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import ProtectedRoute from "./components/ProtectedRoute";
import ProtectedRouteHome from "./components/ProtectedRouteHome";

const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path="/login"
        element={
          <ProtectedRouteHome>
            <LoginPage />
          </ProtectedRouteHome>
        }
      />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/register"
        element={
          <ProtectedRouteHome>
            <RegisterPage />
          </ProtectedRouteHome>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
