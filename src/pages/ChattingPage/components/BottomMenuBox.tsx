import React, { useEffect } from "react";
import styles from "./bottomMenu.module.scss";
import Icon_photo from "@assets/Icons/chatt/photo.svg?react";

interface Props {
  setImgPreview: React.Dispatch<React.SetStateAction<string | null>>;
  imageFile: string | File | null;
  setImageFile: React.Dispatch<React.SetStateAction<string | File | null>>;
  setIsBottomMenuClick: React.Dispatch<React.SetStateAction<boolean>>;
}
const BottomMenuBox: React.FC<Props> = ({ setImgPreview, imageFile, setImageFile }) => {
  useEffect(() => {
    if (imageFile instanceof File) {
      const objectUrl = URL.createObjectURL(imageFile);
      setImgPreview(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    } else if (typeof imageFile === "string") {
      setImgPreview(imageFile);
    } else {
      setImgPreview(null);
    }
  }, [imageFile]);

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

        setImageFile(file);
        // setIsBottomMenuClick(false);
      }
    }
  };

  return (
    <div className={styles.Container}>
      <div className={styles.IconBox}>
        <label htmlFor="image-upload" className={styles.CameraWrapper}>
          <input
            type="file"
            id="image-upload"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
          <div className={styles.IconBox}>
            <Icon_photo />
            <p>사진</p>
          </div>
        </label>
      </div>
    </div>
  );
};

export default BottomMenuBox;
