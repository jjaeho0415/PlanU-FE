import apiRoutes from "@api/apiRoutes";
import api from "@api/fetcher";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const putUserInfo = async ({
  body,
  token,
}: {
  body: IUpdateUserProfileRequest;
  token: string;
}): Promise<IResponseType> => {
  const formData = new FormData();

  formData.append("name", body.name ?? "null");
  formData.append("email", body.email ?? "null");
  if (body.password) formData.append("password", body.password);
  formData.append("birthDate", body.birthDate ?? "null");

  formData.append("profileImage", body.profileImage ?? "null");

  const response = await api.put<FormData, IResponseType>({
    endpoint: apiRoutes.userInformation,
    authorization: token,
    body: formData,
  });

  return response;
};

export const usePutUserInfo = (token: string) => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (body: IUpdateUserProfileRequest) => putUserInfo({ body, token }),
    onMutate: () => {
      toast.loading("처리 중...", { id: "changeUserInfoLoading" });
    },
    onSuccess: (data) => {
      toast.dismiss("changeUserInfoLoading");
      toast.success(data.resultMsg);
      navigate(-1);
    },
    onError: (error) => {
      toast.dismiss("changeUserInfoLoading");
      toast.error(error.message);
    },
  });
};
