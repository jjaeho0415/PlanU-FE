import styles from "./groupPage.module.scss";
import { useEffect, useState } from "react";
import GroupOptions from "../components/GroupOptions";
import { useNavigate, useParams } from "react-router-dom";
import TodayScheduleList from "../components/TodayScheduleList";
import GroupScheduleCalendar from "../components/GroupScheduleCalendar";
import HasTwoIconHeader from "@components/headers/HasTwoIconHeader";
import { useGetGroupTodaySchedules } from "@api/group/getGroupTodaySchedules";
import useAuthStore from "@store/useAuthStore";
import { endOfMonth, endOfWeek, startOfMonth, startOfWeek, format } from "date-fns";
import { useGetGroupCalendarSchedules } from "@api/group/getGroupCalendarSchedules";
import { usePatchGroupPin } from "@api/group/patchGroupPin";
import { useQueryClient } from "@tanstack/react-query";
import { useGetGroupDetails } from "@api/group/getGroupDetail";
import toast from "react-hot-toast";

const iconOptionsTitle = ["정산하기", "그룹 달력", "게시물", "멤버", "채팅"];

const GroupPage = () => {
  const navigate = useNavigate();
  const currentDate = new Date();
  const monthStart = startOfMonth(currentDate); // 현재 달의 시작 날짜 (요일 포함)
  const monthEnd = endOfMonth(currentDate); // 현재 달의 마지막 날짜 (요일 포함)
  const startDate = startOfWeek(monthStart); // 달력에 표시될 현재 달의 시작 날짜가 포함된 주의 시작 날짜
  const endDate = endOfWeek(monthEnd); // 달력에 표시될 현재 달의 마지막 날짜가 포함된 주의 끝 날짜
  const { accessToken } = useAuthStore.getState();
  const { groupId } = useParams<{ groupId: string }>();
  const { data: groupDetails } = useGetGroupDetails(groupId!, accessToken);
  const { data: groupTodaySchedules } = useGetGroupTodaySchedules(groupId!, accessToken);
  const { data: groupCalendarSchedules } = useGetGroupCalendarSchedules(
    groupId!,
    accessToken,
    format(currentDate, "yyyy-MM"),
  );
  const [optimisticGroupDetails, setOptimisticGroupDetails] = useState<IGroupInfoType>();
  const { mutate: patchGroupPin } = usePatchGroupPin(accessToken);
  const queryClient = useQueryClient();

  useEffect(() => {
    if (groupDetails) {
      setOptimisticGroupDetails(groupDetails.groupInfo);
    }
  }, [groupDetails]);

  const handlePinClick = () => {
    if (!optimisticGroupDetails) {
      return;
    }
    const previousIsPin = optimisticGroupDetails.isPin;
    const loadingToastId = toast.loading("처리 중...");
    setOptimisticGroupDetails((prev) => ({
      ...prev!,
      isPin: !prev?.isPin,
    }));
    patchGroupPin(groupId!, {
      onSuccess: () => {
        toast.dismiss(loadingToastId);
        toast.success("즐겨찾기 등록 완료");
        queryClient.invalidateQueries({
          queryKey: ["GROUP_DETAILS"],
        });
      },
      onError: (error) => {
        setOptimisticGroupDetails((prev) => ({
          ...prev!,
          isPin: previousIsPin,
        }));
        toast.dismiss(loadingToastId);
        toast.error(error.message);
      },
    });
  };

  const handleCreateSchedule = () => {
    navigate(`/createSchedule/${groupId}`);
  };

  const handleCalendarClick = () => {
    navigate(`/group/${groupId}/groupCalendar`);
  };

  return (
    <div className={styles.mainContainer}>
      {!optimisticGroupDetails ? (
        <div className={styles.loading}>로딩중...</div>
      ) : (
        <>
          <HasTwoIconHeader
            backgroundColor="purple"
            title={optimisticGroupDetails?.groupName}
            rightType="star"
            isPin={optimisticGroupDetails?.isPin}
            groupId={Number(groupId!)}
            handleLeftClick={() => navigate("/groupList")}
            handleRightClick={handlePinClick}
          />
          <div className={styles.contentContainer}>
            <div className={styles.iconSection}>
              {iconOptionsTitle.map((title) => (
                <GroupOptions title={title} groupId={groupId!} key={title} />
              ))}
            </div>
            <div className={styles.buttonSection} onClick={handleCreateSchedule}>
              일정 생성하기
            </div>
            <div className={styles.todayScheduleList}>
              <TodayScheduleList
                todayScheduleList={groupTodaySchedules?.todaySchedules}
                groupId={Number(groupId!)}
              />
            </div>
            <div className={styles.groupCalendar}>
              <GroupScheduleCalendar
                groupSchedules={groupCalendarSchedules ? groupCalendarSchedules.groupSchedules : []}
                onClick={handleCalendarClick}
                currentDate={currentDate}
                startDate={startDate}
                endDate={endDate}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default GroupPage;
