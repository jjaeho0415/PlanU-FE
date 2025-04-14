import apiRoutes from "@api/apiRoutes";
import api from "@api/fetcher";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const postUserInformation = async ({
  body,
  token,
}: {
  body: IPostUserInformationRequestBodyType;
  token: string;
}): Promise<IResponseType> => {
  const formData = new FormData();

  formData.append("profileImage", body.UserProfileRequest.profileImage || "");

  formData.append("birthDate", body.UserProfileRequest.birthDate);
  formData.append("gender", body.UserProfileRequest.gender);
  formData.append(
    "termsRequest.isPrivacyPolicyAgreed",
    body.TermsRequest.isPrivacyPolicyAgreed.toString(),
  );
  formData.append(
    "termsRequest.isTermsOfServiceAgreed",
    body.TermsRequest.isTermsOfServiceAgreed.toString(),
  );
  formData.append(
    "termsRequest.isSnsReceiveAgreed",
    body.TermsRequest.isSnsReceiveAgreed.toString(),
  );

  const response = await api.post<FormData, IResponseType>({
    endpoint: apiRoutes.userInformation,
    authorization: token,
    body: formData,
  });

  return response;
};

export const usePostUserInformation = (token: string) => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (body: IPostUserInformationRequestBodyType) => postUserInformation({ body, token }),
    onMutate: () => {
      toast.loading("처리 중...", { id: "registerUserInfoLoading" });
    },
    onSuccess: (data) => {
      toast.dismiss("registerUserInfoLoading");
      toast.success(data.resultMsg);
      navigate("/myCalendar");
    },
    onError: (error) => {
      toast.dismiss("registerUserInfoLoading");
      toast.error(error.message);
    },
  });
};
