import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuthContext } from "../Context/AuthContext";
export const RequireAuth = () => {
  const { token } = useAuthContext();
  const location = useLocation();
  return token ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};
