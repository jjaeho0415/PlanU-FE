import apiRoutes from "@api/apiRoutes";
import api from "@api/fetcher";
import { useMutation } from "@tanstack/react-query";

const postMyAvailableDates = async (authorization: string, availableDates: string[]) => {
  const response:IResponseType = await api.post({
    endpoint: apiRoutes.availableDates,
    body: {
      availableDates: availableDates,
    },
    authorization,
  });
  return response;
};

export const usePostMyAvailableDates = (authorization: string) => {
  return useMutation({
    mutationFn: (availableDates: string[]) => postMyAvailableDates(authorization, availableDates),

  });
};
