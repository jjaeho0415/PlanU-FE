import React, { useState } from "react";
import FooterButtons from "../../../components/buttons/SmallButton";
import HeaderBar from "../../../components/headers/HasOnlyBackArrowHeader";
import ProfileImageEdit from "../../CreateGroupPage/components/ImageUploader";
import DatePicker from "../../RegisterAccountPage/components/DatePicker";
import BottomSheetModal from "../components/BottomSheetModal";
import InlineEditableProfileItem from "../components/InlineEditableProfileItem";
import InlineEditableProfileItemWithButton from "../components/InlineEditableProfileItemWithButton";
import ModalEditableProfileItem from "../components/ModalEditableProfileItem";
import styles from "./profileEditPage.module.scss";

const ProfileEditPage: React.FC = () => {
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [email, setEmail] = useState("daeunlee0713@naver.com");
  const [authCode, setAuthCode] = useState("");

  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [password, setPassword] = useState("");
  const newPassword = "********";
  const passwordConfirm = "ehgkjko0630";
  const [isPasswordConfirmed, setIsPasswordConfirmed] = useState(false);

  const [isBirthDateModalOpen, setIsBirthDateModalOpen] = useState(false);
  const [userBirth, setUserBirth] = useState("2002-07-13");
  const [initialBirth, setInitialBirth] = useState(userBirth);

  // 이메일 모달 열고 닫기
  const handleEmailModalOpen = () => {
    setIsEmailModalOpen(true);
  };
  const handleEmailModalClose = () => {
    setIsEmailModalOpen(false);
  };

  // 이메일 인증
  const handleSendAuthCode = () => {
    alert("인증번호가 발송되었습니다.");
  };

  const handleConfirmAuthCode = () => {
    alert("인증번호가 확인되었습니다.");
  };

  // 비밀번호 모달 열고 닫기
  const handlePasswordOpen = () => {
    setPassword("");
    setIsPasswordConfirmed(false);
    setIsPasswordModalOpen(true);
  };

  const handlePasswordClose = () => {
    setIsPasswordModalOpen(false);
    setPassword("");
    setIsPasswordConfirmed(false);
  };

  // 기존 비밀번호 검증
  const handlePasswordVerification = () => {
    if (password === "123456") {
      setIsPasswordConfirmed(true);
      setPassword("");
    } else {
      alert("비밀번호가 일치하지 않습니다.");
    }
  };

  const handlePasswordConfirm = () => {
    setIsPasswordModalOpen(false);
  };

  // 생일 모달 열고 닫기
  const handleBirthDateOpen = () => {
    setInitialBirth(userBirth);
    setIsBirthDateModalOpen(true);
  };

  const handleBirthDateClose = () => {
    setUserBirth(initialBirth);
    setIsBirthDateModalOpen(false);
  };

  const handleBirthDateConfirm = () => {
    setIsBirthDateModalOpen(false);
  };

  return (
    <div className={styles.container}>
      <HeaderBar title="프로필 수정" handleClick={() => console.log("뒤로가기 클릭됨")} />
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
        <ProfileImageEdit iconType="edit" image={null} setImage={() => {}} />
      </div>
      <div className={styles.profileItems}>
        <InlineEditableProfileItem label="이름" value="이다은" onChange={() => {}} />
        <InlineEditableProfileItem label="아이디" value="Eunii0713" onChange={() => {}} />

        <ModalEditableProfileItem
          label="이메일"
          value="daeunlee0713@naver.com"
          onArrowClick={handleEmailModalOpen}
        />
        <ModalEditableProfileItem
          label="비밀번호"
          value="********"
          onArrowClick={handlePasswordOpen}
        />
        <ModalEditableProfileItem
          label="생일"
          value={userBirth}
          onArrowClick={handleBirthDateOpen}
        />
      </div>
      <div className={styles.footerButtons}>
        <FooterButtons buttonText="다음에" color="light" onClick={() => {}} />
        <FooterButtons buttonText="완료" color="default" onClick={() => {}} />
      </div>

      {/*이메일 모달*/}
      <BottomSheetModal
        isOpen={isEmailModalOpen}
        onClose={handleEmailModalClose}
        onConfirm={handleEmailModalClose}
        isPasswordModal={true}
      >
        <InlineEditableProfileItemWithButton
          label="이메일"
          value={email}
          onChange={setEmail}
          buttonLabel="인증번호 발송"
          onButtonClick={handleSendAuthCode}
        />
        <InlineEditableProfileItemWithButton
          label="인증번호"
          value={authCode}
          onChange={setAuthCode}
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
        <DatePicker userBirth={userBirth} setUserBirth={setUserBirth} setIsBirthError={() => {}} />
      </BottomSheetModal>

      {/*비밀번호 변경*/}
      <BottomSheetModal
        isOpen={isPasswordModalOpen}
        onClose={handlePasswordClose}
        onConfirm={handlePasswordConfirm}
        isPasswordModal={true}
      >
        {/*기존 비밀번호 입력*/}
        {!isPasswordConfirmed ? (
          <InlineEditableProfileItemWithButton
            label="기존 비밀번호"
            value={password}
            onChange={setPassword}
            buttonLabel="확인"
            onButtonClick={handlePasswordVerification}
          />
        ) : (
          <>
            {/*새 비밀번호*/}
            <InlineEditableProfileItemWithButton
              label="새로운 비밀번호"
              value={newPassword}
              onChange={() => {}}
            />

            {/*비밀번호 확인*/}
            <InlineEditableProfileItemWithButton
              label="비밀번호 확인"
              value={passwordConfirm}
              onChange={() => {}}
            />
          </>
        )}
      </BottomSheetModal>
    </div>
  );
};

export default ProfileEditPage;
