import HasTwoIconHeader from "@components/headers/HasTwoIconHeader";
import styles from "./groupSchedule.module.scss";
import Icon_comment from "../../../assets/Icons/scheduleDetail/Icon_comment.svg?react";
import { useState } from "react";
import { useGetGroupScheduleDetail } from "@api/schedule/getGroupScheduleDetail";
import useAuthStore from "@store/useAuthStore";
import { useNavigate, useParams } from "react-router-dom";
import TitleBox from "@components/scheduleDetail/TitleBox";
import TimeBox from "@components/scheduleDetail/TimeBox";
import LocationBox from "@components/scheduleDetail/LocationBox";
import ParticipantsBox from "@components/scheduleDetail/ParticipantsBox";
import MemoBox from "@components/scheduleDetail/MemoBox";
import CommentModal from "@components/scheduleDetail/CommentModal";
import { useGetComments } from "@api/schedule/getComments";

const GroupScheduleDetail: React.FC = () => {
  const [isOpenCommentModal, setIsOpenCommentModal] = useState<boolean>(false);
  const navigate = useNavigate();
  const { accessToken } = useAuthStore();
  const { groupId } = useParams<{ groupId: string }>();
  const { scheduleId } = useParams<{ scheduleId: string }>();
  const { data } = useGetGroupScheduleDetail(accessToken, groupId ?? "", scheduleId ?? "");
  const { data: commentData } = useGetComments(accessToken, groupId ?? "", scheduleId ?? "");

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
      <div className={styles.CommentIconBox}>
        <Icon_comment onClick={() => setIsOpenCommentModal(true)} />
        <p>{commentData?.countOfComment ?? 0}</p>
      </div>
      {isOpenCommentModal && (
        <CommentModal
          setIsOpenCommentModal={setIsOpenCommentModal}
          commentData={commentData ?? null}
          groupId={groupId ?? ""}
          scheduleId={scheduleId ?? ""}
        />
      )}
    </div>
  );
};

export default GroupScheduleDetail;
