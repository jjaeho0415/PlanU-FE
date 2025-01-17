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
import {
  EMAIL_VALIDATION,
  PASSWORD_VALIDATION,
  USER_ID_VALIDATION,
} from "../../../constants/validation";

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
  const [isSendedEmailCode, setIsSendedEmailCode] = useState<boolean>(false);
  const [isCheckedCode, setIsCheckedCode] = useState<boolean>(false);
  const { mutate: sendCode } = usePostEmailVerification();
  const { mutate: confirmCode } = usePostConfirmEmailCode();
  const { mutate: registerAccount } = usePostRegister();
  const { refetch } = useGetCheckIdDuplication(watch("id"), isCheckingId);

  const handleCheckIdDuplication = async () => {
    if (!watch("id")) {
      return alert("ID를 입력하세요.");
    }

    setIsCheckingId(true);
    try {
      const { data: idDuplicationData, error } = await refetch();
      if (idDuplicationData && idDuplicationData.resultMsg === "false") {
        setIsCheckedId(true);
        alert("사용 가능한 ID입니다.");
      } else {
        alert("이미 사용 중인 ID입니다.");
      }
      if (error) {
        console.error(error.message);
      }
    } catch (error) {
      alert("중복 확인에 실패했습니다. 다시 시도해주세요.");
    } finally {
      setIsCheckingId(false);
    }
  };

  const handleSendCode = (email: string) => {
    
    if (!email) {
      alert("이메일을 입력하세요");
      return;
    }
    sendCode(
      { email, purpose: "register" },
      {
        onSuccess: () => {
          setIsSendedEmailCode(true);
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
        required: "이름을 입력하세요",
        minLength: { value: 2, message: "이름은 최소 2자이상부터 가능합니다" },
        maxLength: { value: 6, message: "이름은 최대 6자까지 가능합니다" },
      },
    },
    {
      name: "id",
      text: "ID",
      type: "text",
      buttonText: "중복 확인",
      rules: {
        required: "ID를 입력하세요",
        pattern: {
          value: USER_ID_VALIDATION,
          message: "시작은 영문 대소문자 또는 숫자, 5 ~ 12자 가능합니다",
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
        required: "비밀번호를 입력하세요",
        pattern: {
          value: PASSWORD_VALIDATION,
          message: "비밀번호는 대소문자, 특수 문자, 숫자 포함 8 ~ 15자 가능합니다",
        },
      },
    },
    {
      name: "confirmPassword",
      text: "Confirm Password",
      buttonText: "확인",
      type: "password",
      rules: {
        required: "비밀번호를 다시 확인해주세요",
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
        required: "이메일을 입력하세요",
        pattern: {
          value: EMAIL_VALIDATION,
          message: "잘못된 이메일 형식입니다.",
        },
      },
      onClick: () => handleSendCode(watch("email")),
    },
  ];

  if (isSendedEmailCode) {
    inputList.push({
      name: "code",
      text: "인증코드 6자리 입력",
      buttonText: "확인",
      type: "text",
      rules: {
        required: "인증코드를 입력하세요",
        pattern: { value: /^\d{6}$/, message: "인증코드는 6자리입니다" },
      },
      onClick: () =>
        handleConfirmCode({
          email: watch("email"),
          verificationCode: watch("code"),
          purpose: "register",
        }),
    });
  }

  const onSubmit = (data: IRegisterFormData) => {
    const transformedData = {
      username: data.id,
      password: data.password,
      name: data.name,
      email: data.email,
    };

    if (isCheckedId && isCheckedCode) {
      registerAccount(transformedData, {
        onSuccess: () => {
          navigate("/registerSuccess");
        },
        onError: (error) => {
          alert(error.message);
        },
      });
    } else {
      alert("ID 중복 확인 및 이메일 인증을 완료해주세요.");
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
        {isSendedEmailCode && (
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
