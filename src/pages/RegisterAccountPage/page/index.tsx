import styles from "./registerAccount.module.scss";
import OnlyTextHeader from "@components/headers/OnlyTextHeader";
import { useEffect, useState } from "react";
import DatePicker from "../components/DatePicker";
import MiniButton from "@components/buttons/MiniButton";
import DefaultButton from "@components/buttons/DefaultButton";
import ImageUploader from "@pages/CreateGroupPage/components/ImageUploader";
import RightArrow_Icon from "@assets/Icons/arrow/RightArrow.svg?react";
import { usePostUserInformation } from "@api/user/postUserInformation";
import useAuthStore from "@store/useAuthStore";
import { useGetUserInfo } from "@api/user/getUserInfo";

const userInformation: IPostUserInformationType = {
  UserProfileRequest: {
    birthDate: "",
    gender: "M",
    profileImage: null,
  },
  TermsRequest: {
    isPrivacyPolicyAgreed: "false",
    isTermsOfServiceAgreed: "false",
    isSnsReceiveAgreed: "false",
  },
};

const RegisterAccountPage = () => {
  const [userBirth, setUserBirth] = useState<string>("");
  const [isBirthInputClick, setIsBirthInputClick] = useState<boolean>(false);
  const [isBirthError, setIsBirthError] = useState<boolean>(false);
  const [gender, setGender] = useState<string>("M");
  const [isPrivacyPolicyAgreed, setIsPrivacyPolicyAgreed] = useState<boolean>(false);
  const [isTermsOfServiceAgreed, setIsTermsOfServiceAgreed] = useState<boolean>(false);
  const [isSnsReceiveAgreed, setIsSnsReceiveAgreed] = useState<boolean>(false);
  const [isAllAgreed, setIsAllAgreed] = useState<boolean>(false);
  const [userImage, setUserImage] = useState<File | string | null>(null);
  const [postBody, setPostBody] = useState<IPostUserInformationType>(userInformation);
   const { accessToken } = useAuthStore.getState();
  const { mutate: registerUserInformation } = usePostUserInformation(accessToken);
  const { data: userInfo } = useGetUserInfo(accessToken);

  useEffect(() => {
    setPostBody({
      UserProfileRequest: {
        birthDate: userBirth,
        gender: gender,
        profileImage: typeof userImage === "string" ? null : userImage,
      },
      TermsRequest: {
        isPrivacyPolicyAgreed: isPrivacyPolicyAgreed ? "true" : "false",
        isTermsOfServiceAgreed: isTermsOfServiceAgreed ? "true" : "false",
        isSnsReceiveAgreed: isSnsReceiveAgreed ? "true" : "false",
      },
    });
  }, [
    userBirth,
    gender,
    userImage,
    isPrivacyPolicyAgreed,
    isTermsOfServiceAgreed,
    isSnsReceiveAgreed,
  ]);

  const handleConfirmBirth = () => {
    isBirthError ? alert("생년월일을 알맞게 입력해주세요.") : setIsBirthInputClick(false);
  };

  const handleSelectGender = (gender: string) => {
    gender === "M" ? setGender("M") : setGender("F");
  };

  const handleTermsClick = (type: string) => {
    if (type === "privacy") {
      if (isPrivacyPolicyAgreed && isAllAgreed) {
        setIsAllAgreed(false);
      }
      setIsPrivacyPolicyAgreed(!isPrivacyPolicyAgreed);
    } else if (type === "service") {
      if (isTermsOfServiceAgreed && isAllAgreed) {
        setIsAllAgreed(false);
      }
      setIsTermsOfServiceAgreed(!isTermsOfServiceAgreed);
    } else if (type === "sns") {
      if (isSnsReceiveAgreed && isAllAgreed) {
        setIsAllAgreed(false);
      }
      setIsSnsReceiveAgreed(!isSnsReceiveAgreed);
    } else if (type === "all") {
      if (isAllAgreed) {
        setIsAllAgreed(false);
        setIsPrivacyPolicyAgreed(false);
        setIsSnsReceiveAgreed(false);
        setIsTermsOfServiceAgreed(false);
      } else {
        setIsAllAgreed(true);
        setIsPrivacyPolicyAgreed(true);
        setIsSnsReceiveAgreed(true);
        setIsTermsOfServiceAgreed(true);
      }
    }
  };

  const handleNextBtnClick = () => {
    if (!userBirth) {
      alert("생년월일을 입력해주세요");
      return;
    }
    if (!isPrivacyPolicyAgreed) {
      alert("이용약관 동의는 필수항목입니다.");
      return;
    }
    if (!isTermsOfServiceAgreed) {
      alert("개인정보 수집 및 이용동의는 필수항목입니다.");
      return;
    }

    registerUserInformation(postBody);
  };

  const handleArrowIconClick = () => {
    window.open(
      "https://quartz-guavaberry-b5f.notion.site/14ec348b5aab80d2ae60e91438fed778",
      "_blank",
    );
  };

  return (
    <div className={styles.mainContainer}>
      <OnlyTextHeader title="회원 등록" backgroundColor="purple" />
      <div className={styles.contentContainer}>
        <div className={styles.topSection}>
          <div className={styles.profileImageSection}>
            <div className={styles.profileImage}>
              <ImageUploader iconType="edit" image={userImage} setImage={setUserImage} />
            </div>
            {userInfo && <div>{userInfo.name} 님</div>}
          </div>
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
          <div className={styles.genderContainer}>
            <div>성별</div>
            <div className={styles.bottomBoarder}>
              <div className={styles.genderRadioSection}>
                <div
                  className={styles.genderSection}
                  onClick={() => {
                    handleSelectGender("M");
                  }}
                >
                  <div className={styles.selectBox}>
                    {gender === "M" && <div className={styles.selectBoxChecked} />}
                  </div>
                  <div className={styles.genderText}>남자</div>
                </div>
                <div
                  className={styles.genderSection}
                  onClick={() => {
                    handleSelectGender("F");
                  }}
                >
                  <div className={styles.selectBox}>
                    {gender === "F" && <div className={styles.selectBoxChecked} />}
                  </div>
                  <div className={styles.genderText}>여자</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.bottomSection}>
          <div className={styles.firstSection}>
            <div className={styles.selectBox} onClick={() => handleTermsClick("all")}>
              {isAllAgreed && <div className={styles.selectBoxChecked} />}
            </div>
            <div>약관 전체 동의</div>
          </div>
          <div className={styles.line} />
          <div className={styles.otherSection}>
            <div className={styles.selectBox} onClick={() => handleTermsClick("privacy")}>
              {isPrivacyPolicyAgreed && <div className={styles.selectBoxChecked} />}
            </div>
            <div>이용약관 동의(필수)</div>
          </div>
          <div className={styles.otherSection}>
            <div className={styles.selectBox} onClick={() => handleTermsClick("service")}>
              {isTermsOfServiceAgreed && <div className={styles.selectBoxChecked} />}
            </div>
            <div className={styles.privacySection}>
              <div>개인정보 수집 및 이용동의(필수)</div>
              <div className={styles.arrowIcon} onClick={handleArrowIconClick}>
                <RightArrow_Icon width={8} height={12} />
              </div>
            </div>
          </div>
          <div className={styles.otherSection}>
            <div className={styles.selectBox} onClick={() => handleTermsClick("sns")}>
              {isSnsReceiveAgreed && <div className={styles.selectBoxChecked} />}
            </div>
            <div>E-mail 및 SNS 광고성 수신 동의(선택)</div>
          </div>
        </div>
      </div>
      <div className={styles.buttonSection}>
        <DefaultButton buttonText="다음" onClick={handleNextBtnClick} />
      </div>
    </div>
  );
};

export default RegisterAccountPage;
