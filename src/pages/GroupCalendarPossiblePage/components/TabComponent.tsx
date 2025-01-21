import React, { useState } from "react";
import styles from "./tabComponent.module.scss";
import DateCard from "./DateCard";
import MemberCard from "./MemberCard";
import RankCard from "./RankCard";

//api 연동할 때 props로 넘겨야하면 살리고 아님 지울거
// interface Props {
//   activeTab: "멤버별" | "날짜별" | "순위";
//   setActiveTab: (tab: "멤버별" | "날짜별" | "순위") => void;
// }

const TabComponent: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"멤버별" | "날짜별" | "순위">("멤버별");
  const [isNoOnePossible, setIsNoOnePossible] = useState<boolean>(true);

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
      {activeTab === "멤버별" ? (
        <div className={styles.ContentBox}>
          <MemberCard />
          <MemberCard />
          <MemberCard />
          <MemberCard />
          <MemberCard />
          <MemberCard />
          <MemberCard />
          <MemberCard />
          <MemberCard />
          <MemberCard />
        </div>
      ) : activeTab === "날짜별" ? (
        <div className={styles.ContentBox}>
          <DateCard />
          <DateCard />
          <DateCard />
          <DateCard />
        </div>
      ) : (
        <div className={styles.ContentBox}>
          <RankCard />
        </div>
      )}
    </div>
  );
};

export default TabComponent;
