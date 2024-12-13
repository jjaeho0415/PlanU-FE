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
    formData.append("userProfileRequest.profileImage", body.UserProfileRequest.profileImage);
  }

  formData.append("userProfileRequest.birthDate", body.UserProfileRequest.birthDate);
  formData.append("userProfileRequest.gender", body.UserProfileRequest.gender);
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

  try {
    let entries = formData.entries();
    for (const pair of entries) {
      console.log(pair[0] + ", " + pair[1]);
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
