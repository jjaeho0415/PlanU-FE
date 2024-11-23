import React, { useState } from "react";
import styles from "./find.module.scss";
import Icon_check from "@assets/Icons/checkbox/Icon_checkBox_check.svg?react";
import Icon_uncheck from "@assets/Icons/checkbox/Icon_checkBox_uncheck.svg?react";

const FindComponent: React.FC = () => {
  const [isSaveId, setIsSaveId] = useState<boolean>(false);
  return (
    <div className={styles.Container}>
      <div className={styles.SaveIdBox}>
        <div className={styles.CheckBox} onClick={() => setIsSaveId(!isSaveId)}>
          {isSaveId ? <Icon_check /> : <Icon_uncheck />}
        </div>
        <p>아이디 저장</p>
      </div>
      <p>아이디/비밀번호 찾기</p>
    </div>
  );
};

export default FindComponent;
