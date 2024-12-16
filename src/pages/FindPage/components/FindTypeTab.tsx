import React, { useState } from "react";
import styles from "./Tab.module.scss";

const FindTypeTab: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<string>("id");

  return (
    <div className={styles.Container}>
      <div
        className={`${styles.TextBox} ${selectedTab === "id" && styles.Selected}`}
        onClick={() => setSelectedTab("id")}
      >
        <p>아이디 찾기</p>
      </div>
      <div
        className={`${styles.TextBox} ${selectedTab === "password" && styles.Selected}`}
        onClick={() => setSelectedTab("password")}
      >
        <p>비밀번호 찾기</p>
      </div>
    </div>
  );
};

export default FindTypeTab;
