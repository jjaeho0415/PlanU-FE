import HasTwoIconHeader from "@components/headers/HasTwoIconHeader";
import styles from "./mySchedule.module.scss";
import useAuthStore from "@store/useAuthStore";
import { useNavigate, useParams } from "react-router-dom";
import TitleBox from "@components/scheduleDetail/TitleBox";
import TimeBox from "@components/scheduleDetail/TimeBox";
import LocationBox from "@components/scheduleDetail/LocationBox";
import ParticipantsBox from "@components/scheduleDetail/ParticipantsBox";
import MemoBox from "@components/scheduleDetail/MemoBox";
import { useGetMyScheduleDetail } from "@api/schedule/getMyScheduleDetail";
import { useEffect, useState } from "react";
import MoreModal from "@components/scheduleDetail/MoreModal";
import useScheduleStore from "@store/useScheduleStore";
import { getHours, getMinutes, isSameDay } from "date-fns";
import useLocationInfoStore from "@store/useLocationInfoStore";

const MyScheduleDetailPage: React.FC = () => {
  const navigate = useNavigate();
  const { resetScheduleState } = useScheduleStore.getState();
  const { clearLocationInfo } = useLocationInfoStore.getState();
  const [isOpenMoreModal, setIsOpenMoreModal] = useState<boolean>(false);
  const { accessToken } = useAuthStore();
  const { scheduleId } = useParams<{ scheduleId: string }>();
  const { data: myScheduleData } = useGetMyScheduleDetail(accessToken, scheduleId ?? "");
  const {
    setTitle,
    setColor,
    setIsAllDay,
    setEndDate,
    setStartDate,
    setParticipants,
    setMemo,
    startDate,
    endDate,
  } = useScheduleStore();
  const { setLocationInfo } = useLocationInfoStore();

  useEffect(() => {
    if (myScheduleData) {
      setTitle(myScheduleData.title),
        setColor(myScheduleData.color),
        setEndDate(new Date(myScheduleData.endDateTime)),
        setStartDate(new Date(myScheduleData.startDateTime)),
        setParticipants(myScheduleData.participants),
        setMemo(myScheduleData.memo);

      setLocationInfo(
        myScheduleData.location,
        myScheduleData.latitude,
        myScheduleData.longitude,
        myScheduleData.location,
      );

      const isSameDate = isSameDay(startDate, endDate);
      const isStartMidnight = getHours(startDate) === 0 && getMinutes(startDate) === 0;
      const isEndLateNight = getHours(endDate) === 23 && getMinutes(endDate) === 59;
      if (isSameDate && isStartMidnight && isEndLateNight) {
        setIsAllDay(true);
      }
    }
  }, [myScheduleData]);

  return (
    <div className={styles.Container}>
      <HasTwoIconHeader
        title={myScheduleData?.title ?? ""}
        rightType="moreIcon"
        backgroundColor="purple"
        handleLeftClick={() => {
          navigate(-1);
          resetScheduleState();
          clearLocationInfo();
        }}
        handleRightClick={() => {
          setIsOpenMoreModal(!isOpenMoreModal);
        }}
      />
      <div className={styles.ContentContainer}>
        <TitleBox />
        <TimeBox />
        {myScheduleData?.location && (
          <LocationBox
            lat={myScheduleData.latitude}
            lng={myScheduleData.longitude}
            name={myScheduleData.location}
          />
        )}
        {myScheduleData?.participants.length !== 0 && <ParticipantsBox />}
        <MemoBox />
      </div>
      {isOpenMoreModal && <MoreModal groupId="my" scheduleId={scheduleId ?? ""} />}
    </div>
  );
};

export default MyScheduleDetailPage;
