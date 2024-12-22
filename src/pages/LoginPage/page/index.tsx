import React, { useEffect, useState } from "react";
import styles from "./login.module.scss";
import LoginInput from "@components/inputBoxes/LoginInput";
import { GoLogin } from "@components/buttons/GoLogin";
import LoginButton from "@components/buttons/LoginButton";
import FindComponent from "../components/FindComponent";
import HasOnlyBackArrowHeader from "@components/headers/HasOnlyBackArrowHeader";
import { useNavigate } from "react-router-dom";
import { postLogin } from "@api/user/postLogin";
import { useForm } from "react-hook-form";
import useAuthStore from "@store/useAuthStore";
import { getIsExistUserProfile } from "@api/user/getIsExistUserProfile";

type ILoginFormData = {
  ID: string;
  Password: string;
};

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const storedIsSavedId = localStorage.getItem("isSavedId");
  const booleanStoredSavedId = storedIsSavedId ? JSON.parse(storedIsSavedId) : false;
  const [isSaveId, setIsSaveId] = useState<boolean>(booleanStoredSavedId);
 

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ILoginFormData>({
    defaultValues: {
      ID: "",
      Password: "",
    },
  });

  useEffect(() => {
    const savedId = localStorage.getItem("userStoredId");
    if (savedId) {
      setValue("ID", savedId);
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

  const onSubmit = async (data: ILoginFormData) => {
    const postData: IPostLogin = {
      username: data.ID,
      password: data.Password,
    };
    try {
      const accessToken = await postLogin(postData);

      if (accessToken) {
        useAuthStore.getState().setIsLogin(true);
        useAuthStore.getState().setAccessToken(accessToken);
        isSaveId
          ? localStorage.setItem("userStoredId", postData.username)
          : localStorage.removeItem("userStoredId");

        try {
          const isExistUserProfile = await getIsExistUserProfile(accessToken);
          if (isExistUserProfile === "true") {
            navigate("/myCalendar");
          } else {
            navigate("/registerAccount");
          }
        } catch (error) {
          alert("프로필 확인 중 오류가 발생했습니다.");
        }
      }
    } catch (error) {
      // 백엔드에서 에러처리 해주면 다시 에러핸들링 해야함
      console.error("로그인 실패:", error);
      alert("ID와 Password를 다시 확인하세요");
    }
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
              {...register(input.inputText as keyof ILoginFormData, input.rules)}
            />
            {/* 에러 메시지 출력 */}
            {errors[input.inputText as keyof ILoginFormData] && (
              <p className={styles.Error}>
                {errors[input.inputText as keyof ILoginFormData]?.message}
              </p>
            )}
          </div>
        ))}
      </form>
      <div className={styles.FindBox}>
        <FindComponent isSaveId={isSaveId} setIsSaveId={setIsSaveId} />
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
