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

const MyScheduleDetailPage: React.FC = () => {
  const navigate = useNavigate();
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
          return;
        }}
      />
      <div className={styles.ContentContainer}>
        <TitleBox title={data?.title ?? ""} />
        <TimeBox startDate={data?.startDate ?? ""} endDate={data?.endDate ?? ""} />
        <LocationBox
          name={data?.location ?? ""}
          lat={data?.latitude ?? 0}
          lng={data?.longitude ?? 0}
        />
        <ParticipantsBox participants={data?.participants ?? null} />
        <MemoBox memo={data?.memo ?? ""} />
      </div>
    </div>
  );
};

export default MyScheduleDetailPage;
