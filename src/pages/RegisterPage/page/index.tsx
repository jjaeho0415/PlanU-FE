import { GoLogin } from "@components/buttons/GoLogin";
import styles from "./register.module.scss";
import React, { useState } from "react";
import Icon_alert from "@assets/Icons/Icon_alert.svg?react";
import LoginButton from "@components/buttons/LoginButton";
import LoginInput from "@components/inputBoxes/LoginInput";
import HasOnlyBackArrowHeader from "@components/headers/HasOnlyBackArrowHeader";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { usePostEmailVerification } from "@api/user/postEmailVerification";
import { useGetCheckIdDuplication } from "@api/user/getCheckIdDuplication";
import { usePostConfirmEmailCode } from "@api/user/postConfirmEmailCode copy 2";
import { usePostRegister } from "@api/user/posRegister";

interface IRegisterFormData {
  name: string;
  id: string;
  password: string;
  confirmPassword: string;
  email: string;
  code: string;
}

interface IInputItem {
  name: string;
  text: string;
  type: string;
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
}

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    clearErrors,
  } = useForm<IRegisterFormData>({
    defaultValues: {
      name: "",
      id: "",
      password: "",
      confirmPassword: "",
      email: "",
      code: "",
    },
  });

  const [isCheckingId, setIsCheckingId] = useState<boolean>(false);
  const [isCheckedId, setIsCheckedId] = useState<boolean>(false);
  const [isSendingEmailCode, setIsSendingEmailCode] = useState<boolean>(false);
  const [isCheckedCode, setIsCheckedCode] = useState<boolean>(false);
  const { mutate: sendCode } = usePostEmailVerification();
  const { mutate: confirmCode } = usePostConfirmEmailCode();
  const { mutate: registerAccount } = usePostRegister();
  const { data: idDuplicationData } = useGetCheckIdDuplication(watch("id"), isCheckingId);

  const handleCheckIdDuplication = () => {
    setIsCheckingId(true);
    if (idDuplicationData?.resultMsg === "true") {
      setIsCheckedId(true);
    }
    setIsCheckingId(false);
  };

  const handleSendCode = (email: string) => {
    setIsSendingEmailCode(true);
    sendCode(
      { email },
      {
        onSuccess: () => {
          alert("인증코드 발송 성공");
        },
        onError: (error) => {
          alert(error.message);
        },
      },
    );
  };

  const handleCheckPasswordMatch = (confirmPassword: string, password: string) => {
    return confirmPassword === password || "비밀번호가 일치하지않습니다.";
  };

  const handleConfirmCode = (data: IPostConfirmEmailCode) => {
    confirmCode(data, {
      onSuccess: () => {
        alert("인증코드 일치");
        setIsCheckedCode(true);
      },
      onError: (error) => {
        alert(error.message);
      },
    });
  };

  const inputList: IInputItem[] = [
    {
      name: "name",
      text: "Name",
      type: "text",
      rules: {
        required: "Name is required",
        minLength: { value: 2, message: "Name must be at least 2 characters" },
        maxLength: { value: 6, message: "이름은 최대 6자까지 가능합니다" },
      },
    },
    {
      name: "id",
      text: "ID",
      type: "text",
      buttonText: "중복 확인",
      rules: {
        required: "ID is required",
        pattern: {
          value: /^[A-Za-z0-9]{5,12}$/,
          message: "시작은 영문 대소문자 또는 숫자, 5~12",
        },
      },
      onClick: () => {
        handleCheckIdDuplication();
      },
    },
    {
      name: "password",
      text: "Password",
      type: "password",
      rules: {
        required: "Password is required",
        pattern: {
          value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&()])[A-Za-z\d@$!%*?&()]{8,15}$/,
          message: "비밀번호는 대소문자,특수문자,숫자 포함 8-15자 가능",
        },
      },
    },
    {
      name: "confirmPassword",
      text: "Confirm Password",
      buttonText: "확인",
      type: "password",
      rules: {
        required: "Please confirm your password",
        validate: (value: string) => {
          return handleCheckPasswordMatch(value, watch("password"));
        },
      },
    },
    {
      name: "email",
      text: "e-mail",
      type: "email",
      buttonText: "인증번호 발송",
      rules: {
        required: "Email is required",
        pattern: {
          value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g,
          message: "Invalid email format",
        },
      },
      onClick: () => handleSendCode(watch("email")),
    },
  ];

  if (isSendingEmailCode) {
    inputList.push({
      name: "code",
      text: "인증코드 6자리 입력",
      buttonText: "확인",
      type: "text",
      rules: {
        required: "Code is required",
        pattern: { value: /^\d{6}$/, message: "Code must be 6 digits" },
      },
      onClick: () => handleConfirmCode({ email: watch("email"), verificationCode: watch("code") }),
    });
  }

  const onSubmit = (data: IRegisterFormData) => {
    console.log("Submitted Data:", data);

    if (isCheckedId && isCheckedCode) {
    }
  };

  return (
    <div className={styles.Container}>
      <HasOnlyBackArrowHeader
        title="회원가입"
        pageType="register"
        handleClick={() => {
          navigate(-1);
        }}
      />
      <form onSubmit={handleSubmit(onSubmit)} className={styles.InputBox}>
        {inputList.map((input) => (
          <div key={input.name}>
            <div>
              <LoginInput
                inputText={input.text}
                buttonText={input.buttonText || ""}
                isPassword={input.type === "password"}
                onClick={input.onClick}
                {...register(input.name as keyof IRegisterFormData, input.rules)}
              />
              {/* 에러 메시지 출력 */}
              {errors[input.name as keyof IRegisterFormData] && (
                <p className={styles.Error}>
                  {errors[input.name as keyof IRegisterFormData]?.message}
                </p>
              )}
            </div>
          </div>
        ))}
        {isSendingEmailCode && (
          <div className={styles.ResendBox}>
            <Icon_alert />
            <p className={styles.ResendP}>
              이메일을 받지 못하셨나요?
              <span
                className={styles.Span}
                onClick={() => {
                  clearErrors("email");
                  handleSendCode(watch("email"));
                }}
              >
                이메일 재전송하기
              </span>
            </p>
          </div>
        )}

        <div className={styles.ButtonBox}>
          <LoginButton buttonType="register" onClick={handleSubmit(onSubmit)} />
          <GoLogin textType="login" textColor="gray" />
        </div>
      </form>
    </div>
  );
};

export default RegisterPage;
