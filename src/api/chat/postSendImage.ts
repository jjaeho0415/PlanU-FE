import apiRoutes from "@api/apiRoutes";
import api from "@api/fetcher";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

const postSendImage = async ({
  authorization,
  body,
}: {
  authorization: string;
  body: ISendImageType;
}): Promise<IResponseType> => {
  const formData = new FormData();
  formData.append("groupId", body.groupId);
  formData.append("file", body.file);

  const response: IResponseType = await api.post({
    endpoint: `${apiRoutes.chatImage}`,
    authorization,
    body: formData,
  });
  return response;
};

export const usePostSendImage = (authorization: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: ISendImageType) => postSendImage({ authorization, body }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [],
      });
    },
    onError: (error) => {
      toast.dismiss("sendImageLoading");
      toast.error(error.message);
    },
  });
};
