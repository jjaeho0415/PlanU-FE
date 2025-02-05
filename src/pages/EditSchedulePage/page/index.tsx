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

const members = [
  { userName: "shuding", name: "이수현", profileImage: "" },
  { userName: "danii", name: "이다은", profileImage: "" },
  { userName: "ehgk", name: "김도하", profileImage: "" },
  { userName: "jezo", name: "정재호", profileImage: "" },
  { userName: "sangjun", name: "이상준", profileImage: "" },
  { userName: "twinklehigh", name: "최준혁", profileImage: "" },
];

const EditSchedulePage: React.FC = () => {
  const {
    setTitle,
    setColor,
    setStartDate,
    setEndDate,
    setIsAllDay,
    setParticipants,
    setNote,
    setLocationName,
  } = useScheduleStore();

  useEffect(() => {
    setTitle("수현이 생일파티");
    setColor("#38AAO3");
    setStartDate(new Date());
    setEndDate(new Date());
    setIsAllDay(false);
    setParticipants(members);
    setNote("모두 참석바랍니다~!");
    setLocationName("홍대 2번출구 앞");
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
        <LocationBox />
        <MemberBox />
        <NoteBox />
      </div>
    </div>
  );
};

export default EditSchedulePage;
