import React, { useState } from "react";
import styles from "./tabComponent.module.scss";
import DateCard from "./DateCard";
import MemberCard from "./MemberCard";
import RankCard from "./RankCard";

interface rankProps {
  rank: number;
  date: string;
  possibleMembers: number;
}
const rankData: rankProps[] = [
  {
    rank: 1,
    date: "2025.01.21 (화)",
    possibleMembers: 4,
  },
  {
    rank: 2,
    date: "2025.01.22 (수)",
    possibleMembers: 3,
  },
  {
    rank: 3,
    date: "2025.01.22 (수)",
    possibleMembers: 3,
  },
  {
    rank: 4,
    date: "2025.01.22 (수)",
    possibleMembers: 3,
  },
  {
    rank: 5,
    date: "2025.01.22 (수)",
    possibleMembers: 3,
  },
  {
    rank: 6,
    date: "2025.01.22 (수)",
    possibleMembers: 1,
  },
];
const memberData: IGetAvailableMemberInfoType[] = [
  {
    memberName: "최준혁",
    profileImage: "string",
    availableDates: ["2024.09.11 (수)", "2024.11.11 (목)", "2024.09.11 (수)"],
  },
  {
    memberName: "김도하",
    profileImage: "string",
    availableDates: ["2024.09.11 (수)"],
  },
  {
    memberName: "이상준",
    profileImage: "string",
    availableDates: ["2024.09.11 (수)", "2024.11.11 (목)"],
  },
];

const dateData: IGetAvailableDateInfo[] = [
  {
    availableDate: "2024.09.l11 (수)",
    memberNames: ["김도하", "정재호", "이상준"],
  },
  {
    availableDate: "2024.09.l11 (수)",
    memberNames: ["김도하", "정재호", "이상준", "이수현"],
  },
];

const TabComponent: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"멤버별" | "날짜별" | "순위">("멤버별");

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
          {memberData.map((item) => (
            <MemberCard data={item} />
          ))}
        </div>
      ) : activeTab === "날짜별" ? (
        <div className={styles.ContentBox}>
          {dateData.map((item) => (
            <DateCard data={item} />
          ))}
        </div>
      ) : (
        <div className={styles.ContentBox}>
          {rankData.map((item) => (
            <RankCard item={item} />
          ))}
        </div>
      )}
    </div>
  );
};

export default TabComponent;
