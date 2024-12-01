import apiRoutes from "@api/apiRoutes";
import api from "@api/fetcher";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

type IPostUserInformationType = {
  profileImgUrl: File | null;
  username: string;
  birthDate: string;
  gender: string;
  isPrivacyPolicyAgreed: boolean;
  isTermsOfServiceAgreed: boolean;
  isSnsReceiveAgreed: boolean;
};

const postUserInformation = async (body: IPostUserInformationType): Promise<IResponseType> => {
  const formData = new FormData();

  if (body.profileImgUrl) {
    formData.append("profileImgUrl", body.profileImgUrl);
  }

  formData.append("username", body.username);
  formData.append("birthDate", body.birthDate);
  formData.append("gender", body.gender);
  formData.append("isPrivacyPolicyAgreed", body.isPrivacyPolicyAgreed.toString());
  formData.append("isSnsReceiveAgreed", body.isSnsReceiveAgreed.toString());
  formData.append("isTermsOfServiceAgreed", body.isTermsOfServiceAgreed.toString());

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
