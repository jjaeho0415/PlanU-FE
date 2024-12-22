import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import styles from "./findInput.module.scss";
import InputItem from "./InputItem";
import { usePostEmailVerification } from "@api/user/postEmailVerification";
import { usePostConfirmEmailCode } from "@api/user/postConfirmEmailCode copy 2";
import { usePostRegister } from "@api/user/posRegister";

interface props {
  findType: "id" | "pw";
  setIsDisabledButton: React.Dispatch<React.SetStateAction<boolean>>;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  setNewPassword: React.Dispatch<React.SetStateAction<string>>;
}

const FindInput: React.FC<props> = ({
  findType,
  setIsDisabledButton,
  setUsername,
  setEmail,
  setNewPassword,
}) => {
  const [selectedInputType, setSelectedInputType] = useState<IInputItem[]>([]);
  const [isSendedEmailCode, setIsSendedEmailCode] = useState<boolean>(false);
  const { mutate: sendCode } = usePostEmailVerification();
  const { mutate: confirmCode } = usePostConfirmEmailCode();
  const [isCheckedCode, setIsCheckedCode] = useState<boolean>(false);
  const {
    register: idRegister,
    handleSubmit: idHandleSubmit,
    formState: { errors: idErrors },
    watch: idWatch,
    reset: idReset,
    clearErrors: idClearErrors,
  } = useForm<IFindIdFormData>({
    defaultValues: {
      email: "",
      code: "",
    },
  });

  const {
    register: pwRegister,
    handleSubmit: pwHandleSubmit,
    formState: { errors: pwErrors },
    watch: pwWatch,
    reset: pwReset,
    clearErrors: pwClearErrors,
  } = useForm<IFindPWFormData>({
    defaultValues: {
      id: "",
      email: "",
      code: "",
      newPassword: "",
      confirmNewPassword: "",
    },
  });

  useEffect(() => {
    idReset();
    pwReset();
  }, [findType]);

  const handleSendCode = (email: string, purpose: "register" | "findUsername" | "findPassword") => {
    if (!email) {
      alert("이메일을 입력하세요");
      return;
    }
    sendCode(
      { email, purpose: purpose },
      {
        onSuccess: () => {
          alert("인증코드 발송 성공");
        },
        onError: (error) => {
          alert(error.message);
        },
        onSettled: () => {
          setIsSendedEmailCode(true);
        },
      },
    );
  };

  const handleCheckPasswordMatch = (password: string, confirmPassword: string) => {
    confirmPassword === password
      ? isCheckedCode && setIsDisabledButton(false)
      : "비밀번호가 일치하지않습니다.";
  };

  const handleConfirmCode = (data: IPostConfirmEmailCode) => {
    confirmCode(data, {
      onSuccess: () => {
        alert("인증코드 일치");
        setIsCheckedCode(true);
        setEmail(data.email);
        if (findType === "id") {
          setIsDisabledButton(false);
        }
      },
      onError: (error) => {
        alert(error.message);
      },
    });
  };

  const idInputList: IInputItem[] = [
    {
      name: "email",
      text: "이메일 입력",
      buttonText: "인증번호 전송",
      rules: {
        required: "이메일을 입력하세요.",
      },
      onClick: () => {
        handleSendCode(idWatch("email"), "findUsername");
      },
    },
    {
      name: "code",
      text: "인증번호 입력",
      buttonText: "확인",
      rules: { required: "인증번호를 입력하세요" },
      onClick: () => {
        handleConfirmCode({
          email: idWatch("email"),
          verificationCode: idWatch("code"),
          purpose: "findUsername",
        });
      },
    },
  ];

  const pwInputList: IInputItem[] = [
    {
      name: "id",
      text: "아이디 입력",
      rules: { required: "ID를 입력하세요" },
    },
    {
      name: "email",
      text: "이메일 입력",
      buttonText: "인증번호 전송",
      rules: { required: "이메일을 입력하세요" },
      onClick: () => {
        handleSendCode(pwWatch("email"), "findPassword");
      },
    },
    {
      name: "code",
      text: "인증번호 입력",
      buttonText: "확인",
      rules: { required: "인증번호를 입력하세요" },
      onClick: () => {
        handleConfirmCode({
          email: pwWatch("email"),
          verificationCode: pwWatch("code"),
          purpose: "findPassword",
        });
      },
    },
    {
      name: "newPassword",
      text: "새 비밀번호 입력",
      type: "password",
      rules: { required: "새 비밀번호를 입력하세요" },
    },
    {
      name: "confirmNewPassword",
      text: "새 비밀번호 재입력",
      buttonText: "확인",
      type: "password",
      rules: { required: "새 비밀번호를 재입력하세요" },
      onClick: () => {
        handleCheckPasswordMatch(pwWatch("newPassword"), pwWatch("confirmNewPassword"));
      },
    },
  ];

  useEffect(() => {
    if (findType === "id") {
      setSelectedInputType(idInputList);
    } else {
      setSelectedInputType(pwInputList);
    }
  }, [findType]);

  const handleSubmit = () => {};

  return (
    <form onSubmit={handleSubmit}>
      <div className={styles.InputsBox}>
        {selectedInputType.map((input) => {
          const registerProps =
            findType === "id"
              ? idRegister(input.name as keyof IFindIdFormData, input.rules)
              : pwRegister(input.name as keyof IFindPWFormData, input.rules);
          const errorProps =
            findType === "id"
              ? idErrors[input.name as keyof IFindIdFormData]
              : pwErrors[input.name as keyof IFindPWFormData];

          return (
            <div key={input.name}>
              <InputItem
                inputText={input.text}
                buttonText={input.buttonText || ""}
                isPassword={input.type === "password"}
                onClick={input.onClick}
                {...registerProps}
              />
              {errorProps && <p className={styles.Error}>{errorProps?.message}</p>}
            </div>
          );
        })}
      </div>
    </form>
  );
};

export default FindInput;
