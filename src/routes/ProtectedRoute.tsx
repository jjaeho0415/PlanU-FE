import { useGetUserInfo } from "@api/user/getUserInfo";
import useAuthStore from "@store/useAuthStore";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const { accessToken } = useAuthStore();
  const { isSuccess } = useGetUserInfo(accessToken);

  if (!isSuccess) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
