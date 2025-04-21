type IRegisterFormData = {
  name: string;
  id: string;
  password: string;
  confirmPassword: string;
  email: string;
  code: string;
};

type IInputItem = {
  name: string;
  text: string;
  type?: string;
  rules: {
    required?: string;
    pattern?: {
      value: RegExp;
      message: string;
    };
    minLength?: {
      value: number;
      message: string;
    };
    maxLength?: {
      value: number;
      message: string;
    };
    validate?: (value: string) => string | true;
  };
  buttonText?: string;
  onClick?: () => void;
};

type IFindIdFormData = {
  email: string;
  code: string;
};

type IFindPWFormData = {
  id: string;
  email: string;
  code: string;
  newPassword: string;
  confirmNewPassword: string;
};
