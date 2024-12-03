import EditIcon from "@assets/Icons/Profile Picture/Icon_.pencil.svg?react";
import CameraIcon from "@assets/Icons/Profile Picture/Icon_camera.svg?react";
import DefaultGroupImage from "@assets/Icons/Profile Picture/Icon_default_group.svg?react"; // 비어있는 배경인 그룹 기본 이미지
import DefaultProfileImage from "@assets/Icons/Profile Picture/Icon_default_profile.svg?react"; // 기본 프로필 이미지
import React, { useEffect, useState } from "react";
import styles from "./imageUploader.module.scss";

interface Props {
  iconType: "edit" | "camera";
  image?: File | string | null;
  setImage: React.Dispatch<React.SetStateAction<File | string | null>>;
}

function ImageUploader({ iconType, image, setImage }: Props) {
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    if (image instanceof File) {
      // File 타입일 경우 미리보기 URL 생성
      const objectUrl = URL.createObjectURL(image);
      setPreview(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    } else if (typeof image === "string") {
      setPreview(image);
    } else {
      setPreview(null);
    }
  }, [image]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file) {
        const validExtensions = ["jpg", "jpeg", "png"];
        const fileExtension = file.name.split(".").pop()?.toLowerCase();

        if (!fileExtension || !validExtensions.includes(fileExtension)) {
          alert("이미지 형식에 맞지 않습니다. (허용: jpg, jpeg, png)");
          return;
        }

        const maxFileSize = 5 * 1024 * 1024;
        if (file.size > maxFileSize) {
          alert("파일이 너무 큽니다. (최대: 5MB)");
          return;
        }

        setImage(file);
      }
    }

    return (
      <div className={styles.ImageCircle}>
        {preview ? (
          <img src={preview} alt="Uploaded preview" className={styles.PreviewImage} />
        ) : image && typeof image === "string" ? (
          <img src={image} alt="currentImage" className={styles.PreviewImage} />
        ) : iconType === "edit" ? (
          <DefaultProfileImage className={styles.DefaultImage} />
        ) : (
          <DefaultGroupImage className={styles.DefaultImage} />
        )}

        <div className={styles.SmallCircle}>
          <label htmlFor="image-upload" className={styles.CameraWrapper}>
            <input
              type="file"
              id="image-upload"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
            {iconType === "camera" ? (
              <CameraIcon width={24} height={24} className={styles.CameraIcon} />
            ) : (
              <EditIcon width={17} height={17} className={styles.CameraIcon} />
            )}
          </label>
        </div>
      </div>
    );
  };
}
export default ImageUploader;
