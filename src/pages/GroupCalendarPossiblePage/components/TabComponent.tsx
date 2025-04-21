import React from "react";
import styles from "./tabComponent.module.scss";
import DateCard from "./DateCard";
import MemberCard from "./MemberCard";
import RankCard from "./RankCard";
interface Props {
  activeTab: "멤버별" | "날짜별" | "순위";
  tabs: { tabName: string; onClick: () => void }[];
  availableMemberInfos: IGroupAvailableDatesMemberInfoItemType[] | undefined;
  availableDateInfos: IGroupAvailableDatesDateInfoItemType[] | undefined;
  availableDateRanks: IGroupAvailableDatesRankItemType[] | undefined;
  groupTotalNumber: number | undefined;
}

const TabComponent: React.FC<Props> = ({
  activeTab,
  tabs,
  availableMemberInfos,
  availableDateInfos,
  availableDateRanks,
  groupTotalNumber,
}) => {
  return (
    <div className={styles.Container}>
      <div className={styles.TabBox}>
        {tabs.map((tab) => (
          <button
            key={tab.tabName}
            className={`${styles.tabButton} ${activeTab === tab.tabName ? styles.active : ""}`}
            onClick={tab.onClick}
          >
            {tab.tabName}
          </button>
        ))}
      </div>
      {activeTab === "멤버별" ? (
        <div className={styles.ContentBox}>
          {availableMemberInfos?.map((availableMemberInfo, index) => (
            <MemberCard
              availableDatesMemberInfo={availableMemberInfo}
              key={index + availableMemberInfo.name}
            />
          ))}
        </div>
      ) : activeTab === "날짜별" ? (
        <div className={styles.ContentBox}>
          {availableDateInfos?.map((availableDateInfo, index) => (
            <DateCard availableDateInfo={availableDateInfo} groupTotalNumber={groupTotalNumber} key={index + availableDateInfo.availableDate} />
          ))}
        </div>
      ) : (
        <div className={styles.ContentBox}>
          {availableDateRanks?.map((availableDateRank, index) => (
            <RankCard availableDateRank={availableDateRank} groupTotalNumber={groupTotalNumber} key={index+availableDateRank.date} />
          ))}
        </div>
      )}
    </div>
  );
};

export default TabComponent;
