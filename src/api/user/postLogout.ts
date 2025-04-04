import apiRoutes from "@api/apiRoutes";
import api from "@api/fetcher";
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
  return useMutation({
    mutationFn: () => postLogout(),
    onSuccess: () => {
      localStorage.clear();
      navigate("/");
    },
    onError: (error) => {
      alert(error.message);
    },
  });
};
