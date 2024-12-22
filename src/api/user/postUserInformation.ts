import apiRoutes from "@api/apiRoutes";
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

  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}${apiRoutes.userInformation}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });
    if (!response.ok) {
      const { resultMsg } = await response.json();
      throw new Error(resultMsg.message);
    }

    const data: IResponseType = await response.json();
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
      alert(error.message);
    },
  });
};
