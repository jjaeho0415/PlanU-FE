import HasOnlyRightIconHeader from "@components/headers/HasOnlyRightIconHeader";
import styles from "./createSchedule.module.scss";
import { useEffect, useState } from "react";
import TitleBox from "@components/createSchedule/TitleBox";
import ColorBox from "@components/createSchedule/ColorBox";
import TimeBox from "@components/createSchedule/TimeBox";
import LocationBox from "@components/createSchedule/LocationBox";
import MemberBox from "@components/createSchedule/MemberBox";
import NoteBox from "@components/createSchedule/NoteBox";
import DefaultButton from "@components/buttons/DefaultButton";
import useAuthStore from "@store/useAuthStore";
import { usePostCreateMyShcedule } from "@api/schedule/postCreateMySchedule";
import { usePostCreateGroupSchedule } from "@api/schedule/postCreateGroupSchedule";
import { format } from "date-fns";
import useLocationInfoStore from "@store/useLocationInfoStore";

const CreateSchedulePage: React.FC = () => {
  const [title, setTitle] = useState<string>("");
  const [color, setColor] = useState<string>("#3556d7e");
  const [isAllDay, setIsAllDay] = useState<boolean>(false);
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());
  const { lat, lng, name: locationName, location: locationAddress } = useLocationInfoStore();
  const [participants, setParticipants] = useState<IGetMemberType[]>([]);
  const [unregisteredParticipants, setUnregisteredParticipants] = useState<string[]>([]);
  const [postParticipantsData, setPostParticipantsData] = useState<string[]>([]);
  const [memo, setMemo] = useState<string>("");
  const queryParams = new URLSearchParams(location.search); // 쿼리스트링 파싱
  const param = queryParams.get("groupId");
  const groupId = param === "my" ? "my" : Number(param);
  const { accessToken } = useAuthStore();
  const { mutate: createMySchedule } = usePostCreateMyShcedule(accessToken);
  const { mutate: createGroupSchedule } = usePostCreateGroupSchedule(accessToken, Number(groupId));

  useEffect(() => {
    const filteredMemberId: string[] = participants.map(
      (member: IGetMemberType) => member.userName,
    );
    setPostParticipantsData(filteredMemberId);
  }, [participants]);

  const handleButtonClick = () => {
    const data = {
      title: title,
      color: color,
      startDateTime: format(startDate, "YYYY-MM-DDTHH:MM"),
      endDateTime: format(endDate, "YYYY-MM-DDTHH:MM"),
      location: locationName ?? locationAddress,
      latitude: String(lat),
      longitude: String(lng),
      participants: postParticipantsData,
      memo: memo,
    };

    if (param === "my") {
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
          return;
        }}
      />
      <div className={styles.ContentContainer}>
        <TitleBox title={title} setTitle={setTitle} />
        <ColorBox color={color} setColor={setColor} />
        <TimeBox
          isAllDay={isAllDay}
          setIsAllDay={setIsAllDay}
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
        />
        <LocationBox />
        <MemberBox
          participants={participants}
          setParticipants={setParticipants}
          unregisteredParticipnats={unregisteredParticipants}
          setUnregisteredParticipants={setUnregisteredParticipants}
        />
        <NoteBox memo={memo} setMemo={setMemo} />
      </div>
      <div className={styles.ButtonBox}>
        <DefaultButton buttonText="완료" onClick={handleButtonClick} />
      </div>
    </div>
  );
};

export default CreateSchedulePage;
