import React from "react";
import styles from "./find.module.scss";
import Icon_check from "@assets/Icons/checkbox/Icon_checkBox_check.svg?react";
import Icon_uncheck from "@assets/Icons/checkbox/Icon_checkBox_uncheck.svg?react";
import { useNavigate } from "react-router-dom";

interface Props {
  isSaveId: boolean;
  setIsSaveId: React.Dispatch<React.SetStateAction<boolean>>;
}

const FindComponent: React.FC<Props> = ({ isSaveId, setIsSaveId }) => {
  const navigate = useNavigate();
  const handleSaveIdClick = () => {
    if (isSaveId) {
      setIsSaveId(false);
      localStorage.setItem("isSavedId", "false");
    } else {
      setIsSaveId(true);
      localStorage.setItem("isSavedId", "true");
    }
  };

  return (
    <div className={styles.Container}>
      <div className={styles.SaveIdBox}>
        <div className={styles.Cursor} onClick={handleSaveIdClick}>
          {isSaveId ? <Icon_check /> : <Icon_uncheck />}
        </div>
        <p>아이디 저장</p>
      </div>
      <p className={styles.Cursor} onClick={() => navigate("/find")}>
        아이디/비밀번호 찾기
      </p>
    </div>
  );
};

export default FindComponent;
