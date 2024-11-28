import CameraIcon from "@assets/Icons/camera/Icon_camera.svg?react";
import styles from "./ImageUploader.module.scss";

function ImageUploader() {
  return (
    <div className={styles.Uploader}>
      <div className={styles.ImageCircle}>
        <label htmlFor="image-upload" className={styles.CameraWrapper}>
          <input type="file" id="image-upload" accept="image/*" style={{ display: "none" }} />
          <div className={styles.SmallCircle}>
            <CameraIcon width={24} height={24} className={styles.CameraIcon} />
          </div>
        </label>
      </div>
    </div>
  );
}

export default ImageUploader;
