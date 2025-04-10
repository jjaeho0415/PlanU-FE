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

const EditSchedulePage: React.FC = () => {
  const { setTitle, setColor, setStartDate, setEndDate, setIsAllDay, setParticipants, setNote } =
    useScheduleStore();

  useEffect(() => {
    setTitle("수현이 생일파티");
    setColor("#38AAO3");
    setStartDate(new Date());
    setEndDate(new Date());
    setIsAllDay(false);
    setParticipants([]);
    setNote("모두 참석바랍니다~!");
  }, []);

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
        <LocationBox lat={0} lng={0} name="asd" location="asd"/>
        <MemberBox />
        <NoteBox />
      </div>
    </div>
  );
};

export default EditSchedulePage;
