import api from "@api/fetcher";
import apiRoutes from "@api/apiRoutes";
import { useMutation } from "@tanstack/react-query";

interface IemailBody {
  email: string;
}

async function postEmailVerification(body: IemailBody): Promise<IResponseType> {
  const endpoint = `${apiRoutes.users}/email-verification/sends`;
  return await api.post({ endpoint, body });
}

export function usePostEmailVerification() {
  return useMutation({
    mutationFn: (data: IemailBody) => postEmailVerification(data),
  });
}
