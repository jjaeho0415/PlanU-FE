import apiRoutes from "@api/apiRoutes";
import api from "@api/fetcher";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

const postUserInformation = async ({
  body,
  token,
}: {
  body: IPostUserInformationType;
  token: string;
}): Promise<IResponseType> => {
  const formData = new FormData();

  if (body.UserProfileRequest.profileImage) {
    formData.append("UserProfileRequest.profileImgUrl", body.UserProfileRequest.profileImage);
  }

  formData.append("UserProfileRequest.birthDate", body.UserProfileRequest.birthDate);
  formData.append("UserProfileRequest.gender", body.UserProfileRequest.gender);
  formData.append(
    "TermsRequest.isPrivacyPolicyAgreed",
    body.TermsRequest.isPrivacyPolicyAgreed.toString(),
  );
  formData.append(
    "TermsRequest.isTermsOfServiceAgreed",
    body.TermsRequest.isTermsOfServiceAgreed.toString(),
  );
  formData.append(
    "TermsRequest.isSnsReceiveAgreed",
    body.TermsRequest.isSnsReceiveAgreed.toString(),
  );

  try {
    for (let key of formData.keys()) {
      console.log("key : ", key);
    }
    for (let value of formData.values()) {
      console.log("value : ", value);
    }
    const data = await api.post<FormData, IResponseType>({
      endpoint: `${apiRoutes.userInformation}`,
      body: formData,
      authorization: token,
    });
    return data;
  } catch (error) {
    throw error;
  }
};

export const usePostUserInformation = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: ({ body, token }: { body: IPostUserInformationType; token: string }) =>
      postUserInformation({ body, token }),
    onSuccess: (data) => {
      alert(data.resultMsg);
      navigate("/myCalendar");
    },
    onError: (error) => {
      alert("회원정보 등록에 실패하셨습니다.");
      console.error(error);
    },
    
  });
};
