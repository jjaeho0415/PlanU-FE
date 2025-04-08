import HasOnlyRightIconHeader from "@components/headers/HasOnlyRightIconHeader";
import styles from "./editMySchedule.module.scss";
import { useEffect } from "react";
import ColorBox from "@components/createSchedule/ColorBox";
import TimeBox from "@components/createSchedule/TimeBox";
import MemberBox from "@components/createSchedule/MemberBox";
import NoteBox from "@components/createSchedule/NoteBox";
import TitleBox from "@components/createSchedule/TitleBox";
import LocationBox from "@components/createSchedule/LocationBox";
import useScheduleStore from "@store/useScheduleStore";
import useLocationInfoStore from "@store/useLocationInfoStore";

const EditSchedulePage: React.FC = () => {
  return (
    <div className={styles.Container}>
      <HasOnlyRightIconHeader
        title="새로운 일정"
        rightType="button"
        handleClick={() => {
          return;
        }}
      />
      <div className={styles.ContentContainer}>
        <TitleBox />
        <ColorBox />
        <TimeBox />
        {/* <LocationBox /> */}
        <MemberBox />
        <NoteBox />
      </div>
    </div>
  );
};

export default EditSchedulePage;
