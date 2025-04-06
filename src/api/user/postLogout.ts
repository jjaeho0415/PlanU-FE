import apiRoutes from "@api/apiRoutes";
import api from "@api/fetcher";
import useAuthStore from "@store/useAuthStore";
import useBottomStore from "@store/useBottomStore";
import useLocationInfoStore from "@store/useLocationInfoStore";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

const postLogout = async () => {
  const response: IResponseType = await api.post({
    endpoint: apiRoutes.logout,
  });
  return response;
};

export const usePostLogout = () => {
  const navigate = useNavigate();
  const { clearAuth } = useAuthStore.getState();
  const { clearBottomState } = useBottomStore.getState();
  const { clearLocationInfo } = useLocationInfoStore.getState();
  return useMutation({
    mutationFn: () => postLogout(),
    onSuccess: () => {
      clearBottomState();
      clearLocationInfo();
      clearAuth();
      navigate(0);
    },
    onError: (error) => {
      alert(error.message);
    },
  });
};
