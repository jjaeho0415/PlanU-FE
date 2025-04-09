import HasTwoIconHeader from "@components/headers/HasTwoIconHeader";
import styles from "./groupSchedule.module.scss";
import Icon_comment from "../../../assets/Icons/scheduleDetail/Icon_comment.svg?react";
import { useEffect, useState } from "react";
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
import MoreModal from "@components/scheduleDetail/MoreModal";
import useScheduleStore from "@store/useScheduleStore";
import { getHours, getMinutes, isSameDay } from "date-fns";
import useLocationInfoStore from "@store/useLocationInfoStore";

const GroupScheduleDetail: React.FC = () => {
  const [isOpenCommentModal, setIsOpenCommentModal] = useState<boolean>(false);
  const [isOpenMoreModal, setIsOpenMoreModal] = useState<boolean>(false);
  const navigate = useNavigate();
  const { accessToken } = useAuthStore();
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
  const { groupId } = useParams<{ groupId: string }>();
  const { scheduleId } = useParams<{ scheduleId: string }>();
  const { data: groupScheduleData } = useGetGroupScheduleDetail(
    accessToken,
    groupId ?? "",
    scheduleId ?? "",
  );
  const { data: commentData } = useGetComments(accessToken, groupId ?? "", scheduleId ?? "");

  useEffect(() => {
    if (groupScheduleData) {
      setTitle(groupScheduleData.title),
        setColor(groupScheduleData.color),
        setEndDate(new Date(groupScheduleData.endDate)),
        setStartDate(new Date(groupScheduleData.startDate)),
        setParticipants(groupScheduleData.participants),
        setMemo(groupScheduleData.memo);
      setLocationInfo(
        groupScheduleData.location,
        groupScheduleData.latitude,
        groupScheduleData.longitude,
        groupScheduleData.location,
      );

      const isSameDate = isSameDay(startDate, endDate);
      const isStartMidnight = getHours(startDate) === 0 && getMinutes(startDate) === 0;
      const isEndLateNight = getHours(endDate) === 23 && getMinutes(endDate) === 59;
      if (isSameDate && isStartMidnight && isEndLateNight) {
        setIsAllDay(true);
      }
    }
  }, [groupScheduleData]);

  return (
    <div className={styles.Container}>
      <HasTwoIconHeader
        title={groupScheduleData?.title ?? ""}
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
        <LocationBox />
        <ParticipantsBox />
        <MemoBox />
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
      {isOpenMoreModal && <MoreModal groupId={groupId ?? ""} scheduleId={scheduleId ?? ""} />}
    </div>
  );
};

export default GroupScheduleDetail;
