import useAuthStore from "@store/useAuthStore";
import { Navigate, Outlet } from "react-router-dom";

const CommonRoute = () => {
    const { accessToken } = useAuthStore();
  if (accessToken) {
    return <Navigate to={"/myCalendar"} />;
  }
  return <Outlet />;
};

export default CommonRoute;
