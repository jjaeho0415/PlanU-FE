type IPostConfirmEmailCode = {
  email: string;
  verificationCode: string;
};

type IPostUserInformationType = {
  UserProfileRequest: {
    birthDate: string;
    gender: string;
    profileImage: File | null;
  };
  TermsRequest: {
    isPrivacyPolicyAgreed: string;
    isTermsOfServiceAgreed: string;
    isSnsReceiveAgreed: string;
  };
};