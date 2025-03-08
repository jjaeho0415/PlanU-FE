import React, { useEffect, useState } from "react";
import styles from "./find.module.scss";
import HasOnlyBackArrowHeader from "@components/headers/HasOnlyBackArrowHeader";
import { useNavigate } from "react-router-dom";
import FindTypeTab from "../components/FindTypeTab";
import { usePostFindId } from "@api/user/postFindId";
import { usePostFindPw } from "@api/user/postFindPw";
import { usePostEmailVerification } from "@api/user/postEmailVerification";
import { usePostConfirmEmailCode } from "@api/user/postConfirmEmailCode";
import { useForm } from "react-hook-form";
import InputItem from "../components/InputItem";
import { getIdInputList, getPwInputList } from "../../../types/inputLists";
import DefaultButton from "@components/buttons/DefaultButton";

const FindPage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState<"id" | "pw">("id");
  const [buttonText, setButtonText] = useState<string>("");
  const [isDisabledButton, setIsDisabledButton] = useState<boolean>(true);
  const { mutate: findId } = usePostFindId();
  const { mutate: changePassword } = usePostFindPw();
  const [username, setUsername] = useState<string>("");
  const [selectedInputType, setSelectedInputType] = useState<IInputItem[]>([]);
  const [isCheckedCode, setIsCheckedCode] = useState<boolean>(false);
  const [isCheckedPw, setIsCheckedPw] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const { mutate: sendCode } = usePostEmailVerification();
  const { mutate: confirmCode } = usePostConfirmEmailCode();

  useEffect(() => {
    switch (selectedTab) {
      case "id":
        setButtonText("아이디 찾기");
        break;
      case "pw":
        setButtonText("비밀번호 변경");
    }
  }, []);

  const {
    register: idRegister,
    handleSubmit: idHandleSubmit,
    formState: { errors: idErrors },
    watch: idWatch,
    reset: idReset,
  } = useForm<IFindIdFormData>({
    mode: "onChange",
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
  } = useForm<IFindPWFormData>({
    mode: "onChange",
    defaultValues: {
      id: "",
      email: "",
      code: "",
      newPassword: "",
      confirmNewPassword: "",
    },
  });

  useEffect(() => {
    if (isCheckedCode && isCheckedPw) {
      setIsDisabledButton(false);
    }
  }, [pwWatch(), isCheckedCode, isCheckedPw]);

  useEffect(() => {
    selectedTab === "id" ? idReset() : pwReset();
    setUsername("");
    setIsDisabledButton(true);
    setErrorMsg(null);
    setIsCheckedCode(false);
    setIsCheckedPw(false);
  }, [selectedTab]);

  const handleSendCode = (
    email: string,
    purpose: "REGISTER" | "FIND_USERNAME" | "FIND_PASSWORD" | "CHANGE_EMAIL",
  ) => {
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
      },
    );
  };

  const handleCheckPasswordMatch = (password: string, confirmPassword: string) => {
    if (confirmPassword === password) {
      setIsCheckedPw(true);
      alert("비밀번호가 일치합니다.");
    } else {
      alert("비밀번호가 일치하지 않습니다.");
    }
  };

  const handleConfirmCode = (data: IPostConfirmEmailCodeRequestBodyType) => {
    confirmCode(data, {
      onSuccess: () => {
        alert("인증코드 일치");
        setIsCheckedCode(true);
        if (selectedTab === "id") {
          setIsDisabledButton(false);
        }
      },
      onError: (error) => {
        alert(error.message);
      },
    });
  };

  useEffect(() => {
    if (selectedTab === "id") {
      setSelectedInputType(getIdInputList(handleSendCode, handleConfirmCode, idWatch));
    } else {
      setSelectedInputType(
        getPwInputList(handleSendCode, handleConfirmCode, handleCheckPasswordMatch, pwWatch),
      );
    }
  }, [selectedTab]);

  const handleFindId = (data: IFindIdFormData) => {
    findId(
      { email: data.email },
      {
        onSuccess: (res) => {
          setUsername(res.resultMsg);
        },
        onError: (err) => {
          setErrorMsg(err.message);
        },
        onSettled: () => {
          setIsDisabledButton(false);
        },
      },
    );
  };

  const handleChangePassword = (data: IFindPWFormData) => {
    changePassword(
      { username: data.id, email: data.email, newPassword: data.confirmNewPassword },
      {
        onSuccess: () => {
          alert("비밀번호가 변경되었습니다.");
          navigate("login");
        },
        onError: (err) => {
          alert(err.message);
        },
        onSettled: () => {
          setIsDisabledButton(false);
        },
      },
    );
  };

  return (
    <div className={styles.Container}>
      <HasOnlyBackArrowHeader
        title="아이디/비밀번호 찾기"
        pageType="login"
        handleClick={() => navigate("/login")}
      />
      <FindTypeTab selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
      <form
        onSubmit={
          selectedTab === "id" ? idHandleSubmit(handleFindId) : pwHandleSubmit(handleChangePassword)
        }
      >
        <div className={styles.InputsBox}>
          {selectedInputType.map((input) => {
            const registerProps =
              selectedTab === "id"
                ? idRegister(input.name as keyof IFindIdFormData, input.rules)
                : pwRegister(input.name as keyof IFindPWFormData, input.rules);
            const errorProps =
              selectedTab === "id"
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
      <div className={styles.ButtonBox}>
        {errorMsg && (
          <p className={styles.IdNotFound}>입력하신 이메일과 일치하는 정보가 없습니다.</p>
        )}
        {username && (
          <p className={styles.UsernameP}>
            회원님의 아이디는 <span className={styles.Username}>{username}</span> 입니다.
          </p>
        )}
        <DefaultButton
          buttonText={buttonText}
          onClick={
            selectedTab === "id"
              ? idHandleSubmit(handleFindId)
              : pwHandleSubmit(handleChangePassword)
          }
          isDisabled={isDisabledButton}
        />
      </div>
    </div>
  );
};

export default FindPage;
