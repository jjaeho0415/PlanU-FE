import React from "react";
import styles from "./Boxes.module.scss";
import Icon_location from "../../../assets/Icons/scheduleDetail/Icon_location.svg?react";
import Icon_arrow from "@assets/Icons/arrow/Icon_Arrow_upRight.svg?react";
import Map from "@components/map/Map";

const LocationBox: React.FC = () => {
  return (
    <div className={styles.LocationBox}>
      <div className={styles.LocationNameBox}>
        <div className={styles.LocationContainer}>
          <Icon_location />
          <p>홍대입구역 2번 출구 앞</p>
        </div>
        <div className={styles.FindRoadContainer}>
          <Icon_arrow />
          <p>길찾기</p>
        </div>
      </div>
      <div className={styles.MapBox}>
        <Map latLng={{ lat: 0, lng: 0 }} />
      </div>
    </div>
  );
};

export default LocationBox;
