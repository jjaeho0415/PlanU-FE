type IPostConfirmEmailCode = {
  email: string;
  verificationCode: string;
};

type IPostRegister = {
  userId: string;
  password: string;
  name: string;
  email: string;
};

type IPostLogin = {
  userId: string;
  password: string;
};
