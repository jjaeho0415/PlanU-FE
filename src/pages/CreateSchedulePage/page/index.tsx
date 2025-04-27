import HasOnlyRightIconHeader from "@components/headers/HasOnlyRightIconHeader";
import styles from "./createSchedule.module.scss";
import TitleBox from "@components/createSchedule/TitleBox";
import ColorBox from "@components/createSchedule/ColorBox";
import TimeBox from "@components/createSchedule/TimeBox";
import LocationBox from "@components/createSchedule/LocationBox";
import MemberBox from "@components/createSchedule/MemberBox";
import NoteBox from "@components/createSchedule/NoteBox";
import DefaultButton from "@components/buttons/DefaultButton";
import useAuthStore from "@store/useAuthStore";
import { usePostCreateMySchedule } from "@api/schedule/postCreateMySchedule";
import { usePostCreateGroupSchedule } from "@api/schedule/postCreateGroupSchedule";
import { format } from "date-fns";
import useLocationInfoStore from "@store/useLocationInfoStore";
import { useNavigate, useParams } from "react-router-dom";
import useScheduleStore from "@store/useScheduleStore";
import { useState } from "react";
import ChangeColorBox from "@components/createSchedule/ChangeColorBox";

const CreateSchedulePage: React.FC = () => {
  const navigate = useNavigate();
  const {
    title,
    color,
    setColor,
    startDate,
    endDate,
    participants,
    unregisteredParticipants,
    memo,
    isAllDay,
  } = useScheduleStore();
  const { lat, lng, name: locationName, location: locationAddress } = useLocationInfoStore();
  const { groupId } = useParams<{ groupId: string }>();
  const { accessToken } = useAuthStore();
  const { mutate: createMySchedule } = usePostCreateMySchedule(accessToken);
  const { mutate: createGroupSchedule } = usePostCreateGroupSchedule(accessToken, Number(groupId));
  const [isOpenChangeColorModal, setIsOpenChangeColorModal] = useState<boolean>(false);

  const handleButtonClick = () => {
    const filteredMemberId: string[] = participants.map(
      (member: IScheduleMemberType) => member.username,
    );

    const data = {
      title: title,
      color: color,
      startDateTime: isAllDay
        ? format(startDate, "yyyy-MM-dd'T'00:00")
        : format(startDate, "yyyy-MM-dd'T'HH:mm"),
      endDateTime: isAllDay
        ? format(startDate, "yyyy-MM-dd'T'23:59")
        : format(endDate, "yyyy-MM-dd'T'HH:mm"),
      location: locationName ?? locationAddress,
      latitude: lat,
      longitude: lng,
      participants: filteredMemberId,
      memo: memo,
    };

    if (groupId === "my") {
      createMySchedule({ ...data, unregisteredParticipants: unregisteredParticipants });
    } else {
      createGroupSchedule(data);
    }
  };

  return (
    <div className={styles.Container}>
      <HasOnlyRightIconHeader
        title="새로운 일정"
        rightType="x"
        handleClick={() => {
          navigate(-1);
        }}
      />
      <div className={styles.ContentContainer}>
        <TitleBox />
        <ColorBox
          setIsOpenChangeColorModal={setIsOpenChangeColorModal}
          color={color}
        />
        <TimeBox />
        <LocationBox />
        <MemberBox groupId={groupId} />
        <NoteBox />
      </div>
      <div className={styles.ButtonBox}>
        <DefaultButton buttonText="완료" onClick={handleButtonClick} />
      </div>
      {isOpenChangeColorModal && <ChangeColorBox setColor={setColor} setIsOpenChangeColorModal={setIsOpenChangeColorModal}/>}
    </div>
  );
};

export default CreateSchedulePage;
