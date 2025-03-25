import { ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProtectedRouteHome = ({ children }: { children: ReactNode }) => {
  const accessToken = localStorage.getItem("accessToken");
  const navigate = useNavigate();

  useEffect(() => {
    if (accessToken) {
      navigate('/', { replace: true });
    }
  }, [accessToken, navigate]);

  if (accessToken) {
    return null; 
  }

  return children;
};

export default ProtectedRouteHome;
