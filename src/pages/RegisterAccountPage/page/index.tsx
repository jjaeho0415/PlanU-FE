import styles from "./registerAccount.module.scss";
import ProfileEdit_Icon from "@assets/Icons/Icon_ProfileImageEdit.svg?react";
import DefaultProfile_Icon from "@assets/Icons/Icon_DefaultProfile.svg?react";
import OnlyTextHeader from "@components/headers/OnlyTextHeader";
import { useState } from "react";
import DatePicker from "../components/DatePicker";
import MiniButton from "@components/buttons/MiniButton";

const RegisterAccountPage = () => {
  const [userBirth, setUserBirth] = useState<string>("2000-04-15");
  const [isBirthInputClick, setIsBirthInputClick] = useState<boolean>(false);
  const [isBirthError, setIsBirthError] = useState<boolean>(false);

  const handleConfirmBirth = () => {
    isBirthError && alert("생년월일을 알맞게 입력해주세요.")
  }

  return (
    <div className={styles.mainContainer}>
      <OnlyTextHeader title="회원 등록" backgroundColor="purple" />
      <div className={styles.contentContainer}>
        <div className={styles.topSection}>
          <div className={styles.profileImageSection}>
            <DefaultProfile_Icon width={130} height={130} />
            <ProfileEdit_Icon width={24} height={24} className={styles.profileEditIcon} />
          </div>
          <div>이수현 님</div>
        </div>
        <div className={styles.middleSection}>
          <div className={styles.birthSection}>
            <div className={styles.birthTextSection}>
              <div>생년월일</div>
              {isBirthInputClick && (
                <div className={styles.button}>
                  <MiniButton buttonText="확인" color="purple_light" onClick={handleConfirmBirth} />
                </div>
              )}
            </div>

            {isBirthInputClick ? (
              <div className={styles.datePickerSection}>
                <DatePicker
                  userBirth={userBirth}
                  setUserBirth={setUserBirth}
                  setIsBirthError={setIsBirthError}
                />
              </div>
            ) : (
              <div
                className={styles.birthInput}
                onClick={() => {
                  setIsBirthInputClick(true);
                }}
              >
                {userBirth}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterAccountPage;
