import React from "react";
import styles from "./Boxes.module.scss";
import Icon_location from "@assets/Icons/scheduleDetail/Icon_location.svg?react";
import Map from "@components/map/Map";
import { useNavigate } from "react-router-dom";
import { differenceInHours, isSameDay, parse } from "date-fns";
import toast from "react-hot-toast";

interface Props {
  scheduleId?: string;
  groupId?: string;
  startDate?: string;
  endDate?: string;
  name: string;
  lat: number;
  lng: number;
  isParticipants?: boolean;
}

const LocationBox: React.FC<Props> = ({
  scheduleId,
  groupId,
  startDate,
  endDate,
  name,
  lat,
  lng,
  isParticipants
}) => {
  const navigate = useNavigate();

  const handleGoSharingLocationClick = () => {

    if (!isParticipants) {
      toast.error("위치 공유 기능은 참석자만 이용 가능합니다.")
      return;
    }
    const startDateTime = parse(startDate!, "yyyy-MM-dd HH:mm:ss", new Date());
    const endDateTime = parse(endDate!, "yyyy-MM-dd HH:mm:ss", new Date());
    const now = new Date();

    const isAllDayToday =
      startDateTime.getFullYear() === now.getFullYear() &&
      startDateTime.getMonth() === now.getMonth() &&
      startDateTime.getDate() === now.getDate() &&
      startDateTime.getHours() === 0 &&
      startDateTime.getMinutes() === 0 &&
      endDateTime.getFullYear() === now.getFullYear() &&
      endDateTime.getMonth() === now.getMonth() &&
      endDateTime.getDate() === now.getDate() &&
      endDateTime.getHours() === 23 &&
      endDateTime.getMinutes() === 59;

    if (isAllDayToday) {
      navigate(`/group/${groupId}/calendar/schedule/${scheduleId}/locationSharing`);
      return;
    }

    if (isSameDay(now, startDateTime)) {
      const diffInHours = differenceInHours(now, startDateTime);
      if (diffInHours >= -1 && diffInHours <= 1) {
        navigate(`/group/${groupId}/calendar/schedule/${scheduleId}/locationSharing`);
      } else {
        toast.error("위치 현황 공유는 시작시간 ± 1시간 이내에만 가능합니다");
      }
    } else {
      toast.error("위치 현황 공유는 시작시간 ± 1시간 이내에만 가능합니다");
    }
  };

  return (
    <div className={styles.LocationBox}>
      <div className={styles.LocationNameBox}>
        <div className={styles.LocationContainer} style={!groupId ? { width: "100%" } : undefined}>
          <Icon_location />
          <p>{name}</p>
        </div>
        {groupId && (
          <div className={styles.FindRoadContainer} onClick={handleGoSharingLocationClick}>
            <p>위치</p>
            <p>현황</p>
          </div>
        )}
      </div>
      <div className={styles.MapBox}>
        <Map latLng={{ latitude: lat, longitude: lng }} />
      </div>
    </div>
  );
};

export default React.memo(LocationBox);
