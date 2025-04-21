import React from "react";
import styles from "./Tab.module.scss";

interface props {
  selectedTab: string;
  setSelectedTab: React.Dispatch<React.SetStateAction<"id" | "pw">>;
}

const FindTypeTab: React.FC<props> = ({ selectedTab, setSelectedTab }) => {
  return (
    <div className={styles.Container}>
      <div
        className={`${styles.TextBox} ${selectedTab === "id" && styles.Selected}`}
        onClick={() => setSelectedTab("id")}
      >
        <p>아이디 찾기</p>
      </div>
      <div
        className={`${styles.TextBox} ${selectedTab === "pw" && styles.Selected}`}
        onClick={() => setSelectedTab("pw")}
      >
        <p>비밀번호 찾기</p>
      </div>
    </div>
  );
};

export default FindTypeTab;
