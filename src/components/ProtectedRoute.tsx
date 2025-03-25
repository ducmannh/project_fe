import { ReactNode, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const accessToken = localStorage.getItem("accessToken");
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!accessToken) {
      navigate('/login', { state: { from: location }, replace: true });
    }
  }, [accessToken, navigate, location]);

  if (!accessToken) {
    return null; 
  }

  return children;
};

export default ProtectedRoute;
