import apiRoutes from "@api/apiRoutes";
import api from "@api/fetcher";
import { useMutation } from "@tanstack/react-query";

const patchGroupPin = async (groupId: string, authorization: string) => {
  const response: ResponseType = await api.patch({
    endpoint: `${apiRoutes.pin}/${groupId}`,
    authorization,
  });
  return response;
};

export const usePatchGroupPin = (authorization: string) => {
  return useMutation({
    mutationFn: (groupId: string) => patchGroupPin(groupId, authorization),
  });
};
