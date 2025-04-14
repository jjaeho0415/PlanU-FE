import registerSuccessImage from "@assets/images/registerSuccessPage/registerSuccess.png";
import styles from "./registerSuccess.module.scss";
import OnlyTextHeader from "@components/headers/OnlyTextHeader";
import { useNavigate } from "react-router-dom";
import LoginButton from "@components/buttons/LoginButton";

const RegisterSuccessPage = () => {
  const navigate = useNavigate();
  const handleGoLogin = () => {
    navigate("/login");
  };
  return (
    <div className={styles.mainContainer}>
      <OnlyTextHeader title="가입 완료" backgroundColor="purple" />
      <div className={styles.centerSection}>
        <img src={registerSuccessImage} width={210} height={206} />
        <div className={styles.bigText}>가입이 완료되었습니다</div>
        <div className={styles.smallText}>
          <div>PlanU에서 모든 일정을 확인하고</div>
          <div>소중한 사람들과 소중한 약속을 계획해보세요!</div>
        </div>
      </div>
      <div className={styles.bottomSection}>
        <LoginButton buttonType="login" onClick={handleGoLogin} />
      </div>
    </div>
  );
};

export default RegisterSuccessPage;
