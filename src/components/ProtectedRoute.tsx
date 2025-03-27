import { ReactNode, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useAuthStore from "../store/authStore";

export const RouteProtected = ({ children }: { children: ReactNode }) => {
  const accessToken = localStorage.getItem("accessToken");
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!accessToken) {
      navigate("/login", { state: { from: location }, replace: true });
    }
  }, [accessToken, navigate, location]);

  if (!accessToken) {
    return null;
  }

  return children;
};

export const RouteProtectedHome = ({ children }: { children: ReactNode }) => {
  const accessToken = localStorage.getItem("accessToken");
  const navigate = useNavigate();

  useEffect(() => {
    if (accessToken) {
      navigate("/", { replace: true });
    }
  }, [accessToken, navigate]);

  if (accessToken) {
    return null;
  }

  return children;
};

export const RouteProtectedCode = ({ children }: { children: ReactNode }) => {
  const email = useAuthStore((state) => state.email);
  const navigate = useNavigate();

  useEffect(() => {
    if (!email) {
      navigate("/forgot-password", { replace: true });
    }
  }, [email, navigate]);

  return children;
};

export const RouteProtectedResetPassword = ({
  children,
}: {
  children: ReactNode;
}) => {
  const email = useAuthStore((state) => state.email);
  const code = useAuthStore((state) => state.code);
  const navigate = useNavigate();

  useEffect(() => {
    if (!email && !code) {
      navigate("/forgot-password", { replace: true });
    }
  }, [email, code, navigate]);

  return children;
};
