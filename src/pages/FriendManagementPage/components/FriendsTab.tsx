import React, { useState } from "react";
import styles from "./friendsTab.module.scss";

interface FriendsTabProps {
  activeTab?: "친구목록" | "받은요청" | "보낸요청";
}

const FriendsTab: React.FC<FriendsTabProps> = ({ activeTab = "친구목록" }) => {
  const [selectedTab, setSelectedTab] = useState(activeTab);

  return (
    <div className={styles.container}>
      <div className={styles.tabs}>
        <button
          className={`${styles.tabButton} ${selectedTab === "친구목록" ? styles.active : ""}`}
          onClick={() => setSelectedTab("친구목록")}
        >
          친구목록
        </button>
        <button
          className={`${styles.tabButton} ${selectedTab === "받은요청" ? styles.active : ""}`}
          onClick={() => setSelectedTab("받은요청")}
        >
          받은요청
        </button>
        <button
          className={`${styles.tabButton} ${selectedTab === "보낸요청" ? styles.active : ""}`}
          onClick={() => setSelectedTab("보낸요청")}
        >
          보낸요청
        </button>
      </div>

      <div className={styles.tabContent}>
        {selectedTab === "친구목록"}
        {selectedTab === "받은요청"}
        {selectedTab === "보낸요청"}
      </div>
    </div>
  );
};

export default FriendsTab;
