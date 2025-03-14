import { useGetUserInfo } from "@api/user/getUserInfo";
import { useChangePassword } from "@api/user/postChangePassword";
import { usePostConfirmEmailCode } from "@api/user/postConfirmEmailCode";
import { usePostEmailVerification } from "@api/user/postEmailVerification";
import { useVerifyPassword } from "@api/user/postVerifyPassword";
import { usePutUserInfo } from "@api/user/putUserInfo";
import useAuthStore from "@store/useAuthStore";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FooterButtons from "../../../components/buttons/SmallButton";
import HeaderBar from "../../../components/headers/HasOnlyBackArrowHeader";
import ProfileImageEdit from "../../CreateGroupPage/components/ImageUploader";
import DatePicker from "../../RegisterAccountPage/components/DatePicker";
import BottomSheetModal from "../components/BottomSheetModal";
import InlineEditableProfileItem from "../components/InlineEditableProfileItem";
import InlineEditableProfileItemWithButton from "../components/InlineEditableProfileItemWithButton";
import ModalEditableProfileItem from "../components/ModalEditableProfileItem";
import styles from "./profileEditPage.module.scss";

const EditProfilePage: React.FC = () => {
  const { accessToken } = useAuthStore.getState();
  const { data: userInfo } = useGetUserInfo(accessToken);

  const putUserInfoMutation = usePutUserInfo(accessToken);
  const postEmailVerificationMutation = usePostEmailVerification();
  const postConfirmEmailCodeMutation = usePostConfirmEmailCode();
  const postVerifyPasswordMutation = useVerifyPassword();
  const postChangePasswordMutation = useChangePassword();
  const navigate = useNavigate();
  const [birthDate, setBirthDate] = useState<string | null>(null);
  const [authCode, setAuthCode] = useState<string>("");

  const [requestUserNoBirthInfo, setRequestUserNoBirthInfo] =
    useState<IUpdateNoBirthDateProfileRequest>({
      name: null,
      email: null,
      password: null,
      profileImage: null,
    });

  const [requestUserInfo, setRequestUserInfo] = useState<IUpdateUserProfileRequest>({
    name: null,
    email: null,
    password: null,
    profileImage: null,
    birthDate: null,
  });

  useEffect(() => {
    if (userInfo) {
      setRequestUserNoBirthInfo({
        ...requestUserNoBirthInfo,
        name: userInfo.name,
        email: userInfo.email,
      });
    }
  }, [userInfo]);

  useEffect(() => {
    setRequestUserInfo({
      name: requestUserNoBirthInfo.name,
      email: requestUserNoBirthInfo.email,
      password: requestUserNoBirthInfo.password,
      profileImage: requestUserNoBirthInfo.profileImage,
      birthDate: birthDate,
    });
  }, [birthDate, requestUserNoBirthInfo]);

  const [isEmailModalOpen, setIsEmailModalOpen] = useState<boolean>(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState<boolean>(false);
  const [newPassword, setNewPassword] = useState<string>("");
  const [passwordConfirm, setPasswordConfirm] = useState<string>("");
  const [currentPassword, setCurrentPassword] = useState<string>("");
  const [isPasswordConfirmed, setIsPasswordConfirmed] = useState<boolean>(false);

  const [isBirthDateModalOpen, setIsBirthDateModalOpen] = useState<boolean>(false);
  const handlePasswordClose = () => {
    setIsPasswordModalOpen(false);
    setIsPasswordConfirmed(false);
  };

  const handlePasswordConfirm = () => {
    setIsPasswordModalOpen(false);
  };

  const handleBirthDateClose = () => {
    setIsBirthDateModalOpen(false);
  };

  const handleBirthDateConfirm = () => {
    setIsBirthDateModalOpen(false);
  };

  const handleVerifyPassword = () => {
    if (!requestUserInfo.password) {
      alert("기존 비밀번호를 입력해주세요.");
      return;
    }

    postVerifyPasswordMutation.mutate(
      { password: currentPassword },
      {
        onSuccess: () => {
          setIsPasswordConfirmed(true);
          alert("비밀번호가 확인되었습니다.");
        },
        onError: (error) => {
          console.error(error);
          alert("비밀번호가 일치하지 않습니다. 다시 입력해주세요.");
        },
      },
    );
  };

  const handleUpdateUserInfo = () => {
    if (newPassword !== passwordConfirm) {
      alert("새로운 비밀번호가 일치하지 않습니다.");
      return;
    }

    putUserInfoMutation.mutate({
      ...requestUserInfo,
      password: newPassword || requestUserInfo.password,
    });
  };
  const handleChangePassword = () => {
    if (!newPassword || !passwordConfirm) {
      alert("새 비밀번호와 비밀번호 확인을 입력해주세요.");
      return;
    }

    if (newPassword !== passwordConfirm) {
      alert("새 비밀번호가 일치하지 않습니다.");
      return;
    }

    postChangePasswordMutation.mutate(
      { newPassword, confirmPassword: passwordConfirm },
      {
        onSuccess: (response) => {
          alert(response.message || "비밀번호가 성공적으로 변경되었습니다.");
          setIsPasswordModalOpen(false);
        },
        onError: (error) => {
          console.error(error);
          alert("비밀번호 변경에 실패했습니다. 다시 시도해주세요.");
        },
      },
    );
  };

  const handleSendAuthCode = () => {
    if (!requestUserInfo.email) {
      alert("이메일을 입력해주세요.");
      return;
    }

    postEmailVerificationMutation.mutate(
      {
        email: requestUserInfo.email,
        purpose: "CHANGE_EMAIL",
      },
      {
        onSuccess: () => {
          alert("인증번호가 발송되었습니다.");
        },
        onError: (error) => {
          console.error(error);
          alert("이메일 인증 요청에 실패했습니다.");
        },
      },
    );
  };

  const handleAuthCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAuthCode(e.target.value);
  };

  const handleConfirmAuthCode = () => {
    if (!authCode) {
      alert("인증번호를 입력해주세요.");
      return;
    }

    const email = requestUserInfo.email ?? "";
    if (!email) {
      alert("이메일을 입력해주세요.");
      return;
    }

    postConfirmEmailCodeMutation.mutate(
      {
        email,
        verificationCode: authCode,
        purpose: "CHANGE_EMAIL",
      },
      {
        onSuccess: () => {
          alert("이메일 인증이 완료되었습니다.");
          setIsEmailModalOpen(false);
        },
        onError: (error) => {
          console.error(error);
          alert("인증번호가 일치하지 않습니다. 다시 확인해주세요.");
        },
      },
    );
  };

  return (
    <div className={styles.container}>
      <HeaderBar
        title="프로필 수정"
        handleClick={() => {
          navigate(-1);
        }}
      />
      <div
        style={{
          width: "120px",
          height: "120px",
          justifyContent: "center",
          alignItems: "center",
          margin: "25px auto",
          display: "flex",
        }}
      >
        <ProfileImageEdit
          iconType="edit"
          image={userInfo?.profileImage || null}
          setImage={() => {}}
        />
      </div>
      <div className={styles.profileItems}>
        <InlineEditableProfileItem
          label="이름"
          value={requestUserInfo.name}
          setRequestUserInfo={setRequestUserInfo}
          requestUserInfo={requestUserInfo}
        />
        <InlineEditableProfileItem
          label="아이디"
          value={userInfo?.username || ""}
          setRequestUserInfo={() => {}}
          requestUserInfo={requestUserInfo}
          isDisabled={true}
        />
        <ModalEditableProfileItem
          label="이메일"
          value={requestUserInfo.email}
          onArrowClick={() => setIsEmailModalOpen(true)}
        />
        <ModalEditableProfileItem
          label="비밀번호"
          value={requestUserInfo.password}
          onArrowClick={() => setIsPasswordModalOpen(true)}
        />
        <ModalEditableProfileItem
          label="생일"
          value={requestUserInfo.birthDate}
          onArrowClick={() => setIsBirthDateModalOpen(true)}
        />
      </div>
      <div className={styles.footerButtons}>
        <FooterButtons buttonText="다음에" color="light" onClick={() => {}} />
        <FooterButtons buttonText="완료" color="default" onClick={handleUpdateUserInfo} />
      </div>

      {/*이메일 모달*/}
      <BottomSheetModal
        isOpen={isEmailModalOpen}
        onClose={() => setIsEmailModalOpen(false)}
        onConfirm={() => setIsEmailModalOpen(false)}
        isPasswordModal={true}
      >
        <InlineEditableProfileItemWithButton
          label="이메일"
          value={requestUserInfo.email}
          setRequestUserInfo={setRequestUserInfo}
          requestUserInfo={requestUserInfo}
          buttonLabel="인증번호 발송"
          onButtonClick={handleSendAuthCode}
        />
        <InlineEditableProfileItemWithButton
          label="인증번호"
          value={authCode}
          onChange={handleAuthCodeChange}
          buttonLabel="인증 확인"
          onButtonClick={handleConfirmAuthCode}
        />
      </BottomSheetModal>

      {/*생일 선택*/}
      <BottomSheetModal
        isOpen={isBirthDateModalOpen}
        onClose={handleBirthDateClose}
        onConfirm={handleBirthDateConfirm}
      >
        <DatePicker userBirth={birthDate} setUserBirth={setBirthDate} setIsBirthError={() => {}} />
      </BottomSheetModal>

      <BottomSheetModal
        isOpen={isPasswordModalOpen}
        onClose={handlePasswordClose}
        isPasswordModal={true}
      >
        {!isPasswordConfirmed ? (
          <InlineEditableProfileItemWithButton
            label="기존 비밀번호"
            value={requestUserInfo.password}
            setRequestUserInfo={setRequestUserInfo}
            requestUserInfo={requestUserInfo}
            buttonLabel="확인"
            onButtonClick={handleVerifyPassword}
          />
        ) : (
          <>
            {/*새 비밀번호*/}
            <InlineEditableProfileItemWithButton
              label="새로운 비밀번호"
              value={newPassword}
              setRequestUserInfo={setRequestUserInfo}
              requestUserInfo={requestUserInfo}
            />

            {/*비밀번호 확인*/}
            <InlineEditableProfileItemWithButton
              label="비밀번호 확인"
              value={passwordConfirm}
              setRequestUserInfo={setRequestUserInfo}
              requestUserInfo={requestUserInfo}
            />
          </>
        )}
      </BottomSheetModal>
    </div>
  );
};

export default EditProfilePage;
