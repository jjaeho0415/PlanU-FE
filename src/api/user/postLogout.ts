import apiRoutes from "@api/apiRoutes";
import api from "@api/fetcher";
import useAuthStore from "@store/useAuthStore";
import useBottomStore from "@store/useBottomStore";
import useLocationInfoStore from "@store/useLocationInfoStore";
import { useMutation } from "@tanstack/react-query";

const postLogout = async () => {
  const response: IResponseType = await api.post({
    endpoint: apiRoutes.logout,
  });
  return response;
};

export const usePostLogout = () => {
  const { clearAuth } = useAuthStore.getState();
  const { clearBottomState } = useBottomStore.getState();
  const { clearLocationInfo } = useLocationInfoStore.getState();
  return useMutation({
    mutationFn: () => postLogout(),
    onSuccess: () => {
      clearBottomState();
      clearLocationInfo();
      clearAuth();
      window.history.replaceState(null, "", window.location.origin);
    },
    onError: (error) => {
      alert(error.message);
    },
  });
};
