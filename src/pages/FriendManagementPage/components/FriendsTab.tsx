import React from "react";
import styles from "./friendsTab.module.scss";

interface Props {
  activeTab: "친구목록" | "받은요청" | "보낸요청";
  setActiveTab: (tab: "친구목록" | "받은요청" | "보낸요청") => void;
}

const FriendsTab: React.FC<Props> = ({ activeTab, setActiveTab }) => {
  return (
    <div className={styles.container}>
      <div className={styles.tabs}>
        <button
          className={`${styles.tabButton} ${activeTab === "친구목록" ? styles.active : ""}`}
          onClick={() => setActiveTab("친구목록")}
        >
          친구목록
        </button>
        <button
          className={`${styles.tabButton} ${activeTab === "받은요청" ? styles.active : ""}`}
          onClick={() => setActiveTab("받은요청")}
        >
          받은요청
        </button>
        <button
          className={`${styles.tabButton} ${activeTab === "보낸요청" ? styles.active : ""}`}
          onClick={() => setActiveTab("보낸요청")}
        >
          보낸요청
        </button>
      </div>
    </div>
  );
};

export default FriendsTab;
