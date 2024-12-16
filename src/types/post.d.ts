type IPostConfirmEmailCode = {
  email: string;
  verificationCode: string;
  purpose: "register" | "findUsername" | "findPassword";
};

type IEmailBody = {
  email: string;
  purpose: "register" | "findUsername" | "findPassword";
};

type IPostRegister = {
  username: string;
  password: string;
  name: string;
  email: string;
};

type IPostLogin = {
  username: string;
  password: string;
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

type IPostFindId = {
  email: string;
};

type IPostFindPassword = {
  username: string;
  email: string;
  newPassword: string;
};
