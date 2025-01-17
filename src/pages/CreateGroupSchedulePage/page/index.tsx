import HasOnlyRightIconHeader from "@components/headers/HasOnlyRightIconHeader";
import styles from "./createGroupSchedule.module.scss";
import DefaultButton from "@components/buttons/DefaultButton";
import { useState } from "react";
import TitleBox from "@components/createSchedule/TitleBox";
import ColorBox from "@components/createSchedule/ColorBox";
import TimeBox from "@components/createSchedule/TimeBox";
import LocationBox from "@components/createSchedule/LocationBox";
import MemberBox from "@components/createSchedule/MemberBox";
import NoteBox from "@components/createSchedule/NoteBox";

const CreateGroupSchedulePage: React.FC = () => {
  const [isAllDay, setIsAllDay] = useState<boolean>(false);
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());

  return (
    <div className={styles.Container}>
      <HasOnlyRightIconHeader
        title="새로운 일정"
        rightType="x"
        handleClick={() => {
          return;
        }}
      />
      <div className={styles.ContentContainer}>
        <TitleBox />
        <ColorBox />
        <TimeBox
          isAllDay={isAllDay}
          setIsAllDay={setIsAllDay}
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
        />
        <LocationBox />
        <MemberBox />
        <NoteBox />
      </div>
      <div className={styles.ButtonBox}>
        <DefaultButton
          buttonText="완료"
          onClick={() => {
            return;
          }}
        />
      </div>
    </div>
  );
};

export default CreateGroupSchedulePage;
