import api from "@api/fetcher";
import apiRoutes from "@api/apiRoutes";
import { useMutation } from "@tanstack/react-query";

async function postEmailVerification(email: string): Promise<IResponseType> {
  const endpoint = `${apiRoutes.users}/email-verification/sends?email=${email}`;
  return await api.post({ endpoint });
}

export const usePostEmailVerification = () => {
  return useMutation({
    mutationFn: (email: string) => postEmailVerification(email),
  });
};
