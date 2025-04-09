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
import { useState } from "react";
import MoreModal from "@components/scheduleDetail/MoreModal";

const MyScheduleDetailPage: React.FC = () => {
  const navigate = useNavigate();
  const [isOpenMoreModal, setIsOpenMoreModal] = useState<boolean>(false);
  const { accessToken } = useAuthStore();
  const { scheduleId } = useParams<{ scheduleId: string }>();
  const { data } = useGetMyScheduleDetail(accessToken, scheduleId ?? "");

  return (
    <div className={styles.Container}>
      <HasTwoIconHeader
        title={data?.title ?? ""}
        rightType="moreIcon"
        backgroundColor="purple"
        handleLeftClick={() => {
          navigate(-1);
        }}
        handleRightClick={() => {
          setIsOpenMoreModal(!isOpenMoreModal);
        }}
      />
      <div className={styles.ContentContainer}>
        <TitleBox />
        <TimeBox />
        {data?.location && <LocationBox />}
        {data?.participants.length !== 0 && <ParticipantsBox />}
        <MemoBox />
      </div>
      {isOpenMoreModal && <MoreModal scheduleId={scheduleId ?? ""} />}
    </div>
  );
};

export default MyScheduleDetailPage;
