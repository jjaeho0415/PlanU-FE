import apiRoutes from "@api/apiRoutes";
import api from "@api/fetcher";
import { useMutation } from "@tanstack/react-query";
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
  formData.append("password", body.password ?? "null");
  formData.append("birthDate", body.birthDate ?? "null");

  formData.append("profileImage", body.profileImage ?? "null");

  const response = await api.post<FormData, IResponseType>({
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
    onSuccess: (data) => {
      alert(data.resultMsg);
      navigate(-1);
    },
    onError: (error) => {
      alert(error.message);
    },
  });
};
