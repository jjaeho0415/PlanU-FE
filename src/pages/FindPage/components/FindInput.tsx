import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import styles from "./findInput.module.scss";
import InputItem from "./InputItem";

interface props {
  findType: "id" | "pw";
}

const FindInput: React.FC<props> = ({ findType }) => {
  const [selectedInputType, setSelectedInputType] = useState<IInputItem[]>([]);

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
      onClick: () => {
        return;
      },
    },
    {
      name: "code",
      text: "인증번호 입력",
      buttonText: "확인",
      rules: {},
      onClick: () => {
        return;
      },
    },
  ];

  const pwInputList: IInputItem[] = [
    {
      name: "id",
      text: "아이디 입력",
      buttonText: "확인",
      rules: {},
      onClick: () => {
        return;
      },
    },
    {
      name: "email",
      text: "이메일 입력",
      buttonText: "인증번호 전송",
      rules: {},
      onClick: () => {
        return;
      },
    },
    {
      name: "code",
      text: "인증번호 입력",
      buttonText: "확인",
      rules: {},
      onClick: () => {
        return;
      },
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
      buttonText: "확인",
      rules: {},
      onClick: () => {
        return;
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

          return (
            <div key={input.name}>
              <InputItem
                inputText={input.text}
                buttonText={input.buttonText || ""}
                isPassword={input.type === "password"}
                onClick={input.onClick}
                {...registerProps}
              />
            </div>
          );
        })}
      </div>
    </form>
  );
};

export default FindInput;
