import useAuthStore from "@store/useAuthStore";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
    const { accessToken } = useAuthStore();

  if (!accessToken) {
    const currentPath = window.location.pathname + window.location.search;
    localStorage.setItem("redirectedFrom", currentPath);
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
