import HasOnlyRightIconHeader from "@components/headers/HasOnlyRightIconHeader";
import styles from "./createMySchedule.module.scss";
import { DefaultButton } from "@components/buttons/DefaultButton";
import TitleBox from "../components/TitleBox";
import ColorBox from "../components/ColorBox";
import TimeBox from "../components/TimeBox";
import LocationBox from "../components/LocationBox";
import MemberBox from "../components/MemberBox";
import NoteBox from "../components/NoteBox";
import { useState } from "react";

const CreateMySchedulePage: React.FC = () => {
  const [isAllDay, setIsAllDay] = useState<boolean>(false);
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");

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
        <TimeBox isAllDay={isAllDay} setIsAllDay={setIsAllDay} />
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

export default CreateMySchedulePage;
