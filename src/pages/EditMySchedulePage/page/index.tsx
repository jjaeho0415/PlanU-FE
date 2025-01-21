import HasOnlyRightIconHeader from "@components/headers/HasOnlyRightIconHeader";
import styles from "./editMySchedule.module.scss";
import { useState } from "react";
import ColorBox from "@components/createSchedule/ColorBox";
import TimeBox from "@components/createSchedule/TimeBox";
import MemberBox from "@components/createSchedule/MemberBox";
import NoteBox from "@components/createSchedule/NoteBox";
import TitleBox from "@components/createSchedule/TitleBox";
import LocationBox from "@components/createSchedule/LocationBox";

const members = [
  { userId: "shuding", name: "이수현" },
  { userId: "danii", name: "이다은" },
  { userId: "ehgk", name: "김도하" },
  { userId: "jezo", name: "정재호" },
  { userId: "sangjun", name: "이상준" },
  { userId: "twinklehigh", name: "최준혁" },
];

const EditSchedulePage: React.FC = () => {
  const [isAllDay, setIsAllDay] = useState<boolean>(false);
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());

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
        <TitleBox title="수현이 생일파티" />
        <ColorBox />
        <TimeBox
          isAllDay={isAllDay}
          setIsAllDay={setIsAllDay}
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
        />
        <LocationBox location="홍대입구역 2번 출구" />
        <MemberBox members={members} />
        <NoteBox value="모두 참석바랍니다~!" />
      </div>
    </div>
  );
};

export default EditSchedulePage;
