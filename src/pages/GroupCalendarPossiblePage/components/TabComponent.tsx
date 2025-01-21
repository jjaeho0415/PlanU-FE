import React from "react";
import styles from "./tabComponent.module.scss";

interface Props {
  activeTab: "멤버별" | "날짜별" | "순위";
  setActiveTab: (tab: "멤버별" | "날짜별" | "순위") => void;
}

const TabComponent: React.FC<Props> = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { tabName: "멤버별", onclick: () => setActiveTab("멤버별") },
    { tabName: "날짜별", onclick: () => setActiveTab("날짜별") },
    { tabName: "순위", onclick: () => setActiveTab("순위") },
  ];
  return (
    <div className={styles.Container}>
      <div className={styles.TabBox}>
        {tabs.map((tab) => (
          <button
            key={tab.tabName}
            className={`${styles.tabButton} ${activeTab === tab.tabName ? styles.active : ""}`}
            onClick={tab.onclick}
          >
            {tab.tabName}
          </button>
        ))}
      </div>
      <div className={styles.ContentBox}></div>
    </div>
  );
};

export default TabComponent;
