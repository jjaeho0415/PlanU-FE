import HasTwoIconHeader from "@components/headers/HasTwoIconHeader";
import styles from "./mySchedule.module.scss";
import TitleBox from "../components/TitleBox";
import TimeBox from "../components/TimeBox";
import LocationBox from "../components/LocationBox";
import ParticipantsBox from "../components/ParticipantsBox";
import MemoBox from "../components/MemoBox";
import Icon_comment from "../../../assets/Icons/scheduleDetail/Icon_comment.svg?react";
import { useState } from "react";
import CommentModal from "../components/CommentModal";
import { useNavigate, useParams } from "react-router-dom";
import useAuthStore from "@store/useAuthStore";
import { useGetMyScheduleDetail } from "@api/schedule/getMyScheduleDetail";

const MyScheduleDetailPage: React.FC = () => {
  const [isOpenCommentModal, setIsOpenCommentModal] = useState<boolean>(false);
  const navigate = useNavigate();
  const { accessToken } = useAuthStore();
  const { scheduleId } = useParams<{ scheduleId: string }>();
  const { data } = useGetMyScheduleDetail(accessToken, scheduleId ?? "");

  return (
    <div className={styles.Container}>
      <HasTwoIconHeader
        title={data!.title}
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
        <TitleBox title={data!.title} />
        <TimeBox startDate={data!.startDate} endDate={data!.endDate} />
        <LocationBox name={data!.location} lat={data!.latitude} lng={data!.longitude} />
        <ParticipantsBox />
        <MemoBox />
      </div>
      <div className={styles.CommentIconBox}>
        <Icon_comment onClick={() => setIsOpenCommentModal(true)} />
        <p>17</p>
      </div>
      {isOpenCommentModal && <CommentModal setIsOpenCommentModal={setIsOpenCommentModal} />}
    </div>
  );
};

export default MyScheduleDetailPage;
