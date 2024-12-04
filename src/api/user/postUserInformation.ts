import apiRoutes from "@api/apiRoutes";
import api from "@api/fetcher";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";


const postUserInformation = async (body: IPostUserInformationType): Promise<IResponseType> => {
  const formData = new FormData();

  if (body.UserProfileRequest.profileImage) {
    formData.append("profileImgUrl", body.UserProfileRequest.profileImage);
  }

  formData.append("birthDate", body.UserProfileRequest.birthDate);
  formData.append("gender", body.UserProfileRequest.gender);
  formData.append("isPrivacyPolicyAgreed", body.TermsRequest.isPrivacyPolicyAgreed.toString());
  formData.append("isSnsReceiveAgreed", body.TermsRequest.isSnsReceiveAgreed.toString());
  formData.append("isTermsOfServiceAgreed", body.TermsRequest.isTermsOfServiceAgreed.toString());

  try {
    const data = await api.post<FormData, IResponseType>({
      endpoint: `${apiRoutes.userInformation}`,
      body: formData,
    });
    return data;
  } catch (error) {
    throw error;
  }
};

export const usePostUserInformation = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (body: IPostUserInformationType) => postUserInformation(body),
    onSuccess: (data) => {
      alert(data.resultMsg);
      navigate("/myCalender");
    },
    onError: (error) => {
      alert("회원정보 등록에 실패하셨습니다.");
      console.error(error);
    },
  });
};
