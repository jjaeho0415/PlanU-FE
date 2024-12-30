import useAuthStore from "@store/useAuthStore";
import useBottomStore from "@store/useBottomStore";
import { useEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import {
  BOTTOM_INDEX_0,
  BOTTOM_INDEX_1,
  BOTTOM_INDEX_2,
  BOTTOM_INDEX_3,
} from "../constants/routingUrl";

const ProtectedRoute = () => {
  const { accessToken } = useAuthStore();

  const location = useLocation();
  const { setBottomIndex } = useBottomStore();

  useEffect(() => {
    const currentPath = location.pathname;
    if (currentPath.includes(BOTTOM_INDEX_0)) {
      setBottomIndex(0);
    } else if (currentPath.includes(BOTTOM_INDEX_1)) {
      setBottomIndex(1);
    } else if (currentPath.includes(BOTTOM_INDEX_2)) {
      setBottomIndex(2);
    } else if (currentPath.includes(BOTTOM_INDEX_3)) {
      setBottomIndex(3);
    }
  }, [location.pathname]);

  if (!accessToken) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
