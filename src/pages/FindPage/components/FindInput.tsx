import React from "react";
import { useForm } from "react-hook-form";
import styles from "./Tab.module.scss";

interface props {
  findType: "id" | "password";
}

const FindInput: React.FC<props> = ({ findType }) => {
  const {
    register: idRegister,
    handleSubmit: idHandleSubmit,
    formState: { errors: idErrors },
    watch: idWatch,
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

  const idInputList: IInputItem[] = [
    {
      name: "email",
      text: "이메일 입력",
      buttonText: "인증번호 전송",
      rules: {
        required: "이메일을 입력하세요.",
      },
    },
    {
      name: "code",
      text: "인증번호 입력",
      buttonText: "확인",
      rules: {},
    },
  ];

  const pwInputList: IInputItem[] = [
    {
      name: "id",
      text: "아이디 입력",
      buttonText: "확인",
      rules: {},
    },
    {
      name: "email",
      text: "이메일 입력",
      buttonText: "인증번호 전송",
      rules: {},
    },
    {
      name: "code",
      text: "인증번호 입력",
      buttonText: "확인",
      rules: {},
    },
    {
      name: "newPassword",
      text: "새 비밀번호 입력",
      type: "password",
      rules: {},
    },
    {
      name: "confirmNewPassword",
      text: "새 비밀번호 재입력",
      type: "password",
      buttonText: "새 비밀번호 재입력",
      rules: {},
    },
  ];

  const handleSubmit = () => {};

  return (
    <form onSubmit={handleSubmit}>
      <div className={styles.InputsBox}>
        {findType === "id"
          ? idInputList.map(() => <div></div>)
          : pwInputList.map(() => <div></div>)}
      </div>
    </form>
  );
};

export default FindInput;
