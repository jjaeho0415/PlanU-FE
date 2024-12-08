import React, { useEffect } from "react";
import styles from "./login.module.scss";
import LoginInput from "@components/inputBoxes/LoginInput";
import { GoLogin } from "@components/buttons/GoLogin";
import LoginButton from "@components/buttons/LoginButton";
import FindComponent from "../components/FindComponent";
import HasOnlyBackArrowHeader from "@components/headers/HasOnlyBackArrowHeader";
import { useNavigate } from "react-router-dom";
import { usePostLogin } from "@api/user/postLogin";
import { useForm } from "react-hook-form";
import useAuthStore from "@store/useAuthStore";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { mutate: login } = usePostLogin();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<IPostLogin>({
    defaultValues: {
      username: "",
      password: "",
    },
  });

  useEffect(() => {
    const savedId = localStorage.getItem("storedUserId");
    if (savedId) {
      setValue("username", savedId);
    }
  }, [setValue]);

  const inputList = [
    {
      inputText: "ID",
      buttonText: null,
      isPassword: false,
      rules: {
        required: "ID를 입력하세요",
        pattern: {
          value: /^[A-Za-z0-9]{5,12}$/,
          message: "시작은 영문 대소문자 또는 숫자, 5 ~ 12자 가능합니다",
        },
      },
    },
    {
      inputText: "Password",
      buttonText: null,
      isPassword: true,
      rules: {
        required: "패스워드를 입력하세요",
        pattern: {
          value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&()])[A-Za-z\d@$!%*?&()]{8,15}$/,
          message: "비밀번호는 대소문자, 특수 문자, 숫자 포함 8 ~ 15자 가능합니다",
        },
      },
    },
  ];

  const onSubmit = (data: IPostLogin) => {
    console.log("보낼 데이터", data);
    login(data, {
      onSuccess: (accessToken: string) => {
        if (accessToken) {
          console.log(accessToken);
          useAuthStore.getState().setIsLogin(true);
          useAuthStore.getState().setAccessToken(accessToken);
          localStorage.setItem("userStoredId", data.username);
        } else {
          console.error("Access token not found in the response");
        }

        navigate("/myCalendar");
      },
      onError: (error) => {
        console.error(error);
        alert("ID와 Password를 다시 확인하세요");
      },
    });
  };

  return (
    <div className={styles.Container}>
      <HasOnlyBackArrowHeader
        title="로그인"
        pageType="login"
        handleClick={() => {
          navigate(-1);
        }}
      />
      <form onSubmit={handleSubmit(onSubmit)} className={styles.InputBox}>
        {inputList.map((input, index) => (
          <div key={index}>
            <LoginInput
              inputText={input.inputText}
              buttonText={input.buttonText ?? ""}
              isPassword={input.isPassword}
              {...register(input.inputText as keyof IPostLogin, input.rules)}
            />
            {/* 에러 메시지 출력 */}
            {errors[input.inputText as keyof IPostLogin] && (
              <p className={styles.Error}>{errors[input.inputText as keyof IPostLogin]?.message}</p>
            )}
          </div>
        ))}
      </form>
      <div className={styles.FindBox}>
        <FindComponent />
      </div>
      <div className={styles.ButtonBox}>
        <LoginButton buttonType="login" onClick={handleSubmit(onSubmit)} />
        <LoginButton
          buttonType="login_kakao_white"
          onClick={() => {
            return;
          }}
        />
      </div>
      <div className={styles.GoLoginBox}>
        <GoLogin textType="register" textColor="gray" />
      </div>
    </div>
  );
};

export default LoginPage;
