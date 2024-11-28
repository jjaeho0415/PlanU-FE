import styles from "./registerAccount.module.scss";
import ProfileEdit_Icon from "@assets/Icons/Icon_ProfileImageEdit.svg?react";
import DefaultProfile_Icon from "@assets/Icons/Icon_DefaultProfile.svg?react";
import OnlyTextHeader from "@components/headers/OnlyTextHeader";
import { useState } from "react";
import DatePicker from "../components/DatePicker";

const RegisterAccountPage = () => {
  const [userBirth, setUserBirth] = useState<string>("");
  const [isBirthInputClick, setIsBirthInputClick] = useState<boolean>(false);

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
            <div>생년월일</div>
            {isBirthInputClick ? (
              <DatePicker userBirth={userBirth} setUserBirth={setUserBirth} />
            ) : (
              <div className={styles.birthInput} onClick={() => {setIsBirthInputClick(true)}}/>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterAccountPage;
