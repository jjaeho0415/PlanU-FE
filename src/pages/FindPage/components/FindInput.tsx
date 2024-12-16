import React from "react";
import { useForm } from "react-hook-form";

interface props {
  findType: "id" | "password";
}

const FindInput: React.FC<props> = () => {
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

  return <div></div>;
};

export default FindInput;
