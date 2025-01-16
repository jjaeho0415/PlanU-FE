import HasTwoIconHeader from "@components/headers/HasTwoIconHeader";
import styles from "./mySchedule.module.scss";
import TitleBox from "../components/TitleBox";
import TimeBox from "../components/TimeBox";
import LocationBox from "../components/LocationBox";
import ParticipantsBox from "../components/ParticipantsBox";
import MemoBox from "../components/MemoBox";
import Icon_comment from "@assets/Icons/Icon_comment.svg?react";

const MyScheduleDetailPage: React.FC = () => {
  return (
    <div className={styles.Container}>
      <HasTwoIconHeader
        title="2024.02.19 (화)"
        rightType="moreIcon"
        backgroundColor="purple"
        handleLeftClick={() => {
          return;
        }}
        handleRightClick={() => {
          return;
        }}
      />
      <div className={styles.ContentContainer}>
        <TitleBox />
        <TimeBox />
        <LocationBox />
        <ParticipantsBox />
        <MemoBox />
      </div>
      <div className={styles.CommentIconBox}>
        <Icon_comment />
        <p>17</p>
      </div>
    </div>
  );
};

export default MyScheduleDetailPage;
