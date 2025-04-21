import EditIcon from "@assets/Icons/Default Profile/edit.svg?react";
import React from "react";

import { useNavigate } from "react-router-dom";
import styles from "./profileSection.module.scss";

interface ProfileProps {
  name: string;
  username: string;
  email: string;
  birthDate: string;
  profileImage: string;
}

const ProfileSection: React.FC<ProfileProps> = ({
  name,
  username,
  email,
  birthDate,
  profileImage,
}) => {
  const navigate = useNavigate();
  return (
    <div className={styles.profileSection}>
      <div className={styles.profileImageWrapper}>
        <img src={profileImage} alt={`${name}의 프로필`} className={styles.profileImage} />
      </div>
      <div className={styles.profileInfo}>
        <div className={styles.nameWrapper}>
          <span className={styles.name}>{name}</span>
          <span className={styles.username}>@{username}</span>
        </div>
        <div className={styles.email}>{email}</div>
        <div className={styles.birthDate}>{birthDate}</div>
      </div>
      <button className={styles.editButton}>
        <EditIcon className={styles.editIcon} onClick={() => navigate("/myPage/editProfile")} />
      </button>
    </div>
  );
};

export default ProfileSection;
