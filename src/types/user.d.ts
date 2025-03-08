// 유저 정보 조회 api
type IGetUserInfoResponseBodyType = {
  name: string;
  profileImage: string;
  username: string;
  email: string;
  birthday: string;
};

// 회원가입 api
type IPostRegisterRequestBodyType = {
  username: string;
  password: string;
  name: string;
  email: string;
};

// 이메일 인증코드 검증 api
type IPostConfirmEmailCodeRequestBodyType = {
  email: string;
  verificationCode: string;
  purpose: "REGISTER" | "FIND_USERNAME" | "FIND_PASSWORD" | "CHANGE_EMAIL";
};

// 이메일 인증코드 전송 api
type IPostSendEmailCodeRequestBodyType = {
  email: string;
  purpose: "REGISTER" | "FIND_USERNAME" | "FIND_PASSWORD" | "CHANGE_EMAIL";
};

// 로그인 api
type IPostLoginRequestBodyType = {
  username: string;
  password: string;
};
// 회원 정보 등록 api
type IPostUserInformationRequestBodyType = {
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

// 아이디 찾기 api
type IPostFindIdRequestBodyType = {
  email: string;
};

// 비밀번호 찾기 api
type IPostFindPasswordRequestBodyType = {
  username: string;
  email: string;
  newPassword: string;
};
