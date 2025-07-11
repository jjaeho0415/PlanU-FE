// inputLists.ts

export const getIdInputList = (
  handleSendCode: (
    email: string,
    purpose: "REGISTER" | "FIND_USERNAME" | "FIND_PASSWORD" | "CHANGE_EMAIL",
  ) => void,
  handleConfirmCode: (data: {
    email: string;
    verificationCode: string;
    purpose: "REGISTER" | "FIND_USERNAME" | "FIND_PASSWORD" | "CHANGE_EMAIL";
  }) => void,
  idWatch: (name: string) => string,
): IInputItem[] => [
  {
    name: "email",
    text: "이메일 입력",
    buttonText: "인증번호 전송",
    rules: { required: "이메일을 입력하세요." },
    onClick: () => {
      handleSendCode(idWatch("email"), "FIND_USERNAME");
    },
  },
  {
    name: "code",
    text: "인증번호 입력",
    buttonText: "확인",
    rules: { required: "인증번호를 입력하세요." },
    onClick: () => {
      handleConfirmCode({
        email: idWatch("email"),
        verificationCode: idWatch("code"),
        purpose: "FIND_USERNAME",
      });
    },
  },
];

export const getPwInputList = (
  handleSendCode: (
    email: string,
    purpose: "REGISTER" | "FIND_USERNAME" | "FIND_PASSWORD" | "CHANGE_EMAIL",
  ) => void,
  handleConfirmCode: (data: {
    email: string;
    verificationCode: string;
    purpose: "REGISTER" | "FIND_USERNAME" | "FIND_PASSWORD" | "CHANGE_EMAIL";
  }) => void,
  handleCheckPasswordMatch: (password: string, confirmPassword: string) => void,
  pwWatch: (name: string) => string,
): IInputItem[] => [
  {
    name: "id",
    text: "아이디 입력",
    rules: { required: "ID를 입력하세요." },
  },
  {
    name: "email",
    text: "이메일 입력",
    buttonText: "인증번호 전송",
    rules: { required: "이메일을 입력하세요." },
    onClick: () => {
      handleSendCode(pwWatch("email"), "FIND_PASSWORD");
    },
  },
  {
    name: "code",
    text: "인증번호 입력",
    buttonText: "확인",
    rules: { required: "인증번호를 입력하세요." },
    onClick: () => {
      handleConfirmCode({
        email: pwWatch("email"),
        verificationCode: pwWatch("code"),
        purpose: "FIND_PASSWORD",
      });
    },
  },
  {
    name: "newPassword",
    text: "새 비밀번호 입력",
    type: "password",
    rules: { required: "새 비밀번호를 입력하세요." },
  },
  {
    name: "confirmNewPassword",
    text: "새 비밀번호 재입력",
    buttonText: "확인",
    type: "password",
    rules: { required: "새 비밀번호를 재입력하세요." },
    onClick: () => {
      handleCheckPasswordMatch(pwWatch("newPassword"), pwWatch("confirmNewPassword"));
    },
  },
];
