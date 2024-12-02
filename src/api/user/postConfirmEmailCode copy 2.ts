import api from "@api/fetcher";
import apiRoutes from "@api/apiRoutes";
import { useMutation } from "@tanstack/react-query";

async function postConfirmEmailCode(body: IPostConfirmEmailCode): Promise<IResponseType> {
  const endpoint = `${apiRoutes.users}/email-verification/verify`;
  return await api.post({ endpoint, body });
}

export function usePostConfirmEmailCode() {
  return useMutation({
    mutationFn: (data: IPostConfirmEmailCode) => postConfirmEmailCode(data),
  });
}
