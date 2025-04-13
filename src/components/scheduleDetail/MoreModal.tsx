import React, { useState } from "react";
import styles from "./MoreModal.module.scss";
import { useDeleteGroupSchedule } from "@api/schedule/deleteGroupSchedule";
import useAuthStore from "@store/useAuthStore";
import { useDeleteMySchedule } from "@api/schedule/deleteMySchedule";
import AlertModal from "@components/modals/AlertModal";
import { useNavigate } from "react-router-dom";

interface Props {
  groupId: string;
  scheduleId: string;
}

const types = ["공유하기", "수정하기", "삭제하기"];

const MoreModal: React.FC<Props> = ({ groupId, scheduleId }) => {
  const { accessToken } = useAuthStore();
  const navigate = useNavigate();
  const [isOpenAlertModal, setIsOpenAlertModal] = useState<boolean>(false);
  const { mutate: deleteGroupSchedule } = useDeleteGroupSchedule(
    accessToken,
    groupId ?? "",
    scheduleId,
  );
  const { mutate: deleteMySchedule } = useDeleteMySchedule(accessToken, scheduleId);

  const handleMoreModalClick = (type: string) => {
    switch (type) {
      case "공유하기":
        break;
      case "수정하기":
        if (groupId !== "my") {
          navigate(`/editSchedule/${groupId}/${scheduleId}`);
        } else {
          navigate(`/editSchedule/my/${scheduleId}`);
        }
        break;
      case "삭제하기":
        setIsOpenAlertModal(true);
        break;
      default:
        break;
    }
  };

  const handleDeleteSchedule = () => {
    if (groupId) {
      deleteGroupSchedule();
    } else {
      deleteMySchedule();
    }
  };
  return (
    <div className={styles.Container}>
      {types.map((type) => (
        <div className={styles.Section} onClick={() => handleMoreModalClick(type)}>
          <p>{type}</p>
        </div>
      ))}
      {isOpenAlertModal && (
        <AlertModal
          type="일정삭제"
          onClick={handleDeleteSchedule}
          setIsOpenAlertModal={setIsOpenAlertModal}
        />
      )}
    </div>
  );
};

export default MoreModal;
