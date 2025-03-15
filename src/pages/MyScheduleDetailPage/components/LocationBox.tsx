import React from "react";
import styles from "./Boxes.module.scss";
import Icon_location from "../../../assets/Icons/scheduleDetail/Icon_location.svg?react";
import Icon_arrow from "@assets/Icons/arrow/Icon_Arrow_upRight.svg?react";
import Map from "@components/map/Map";

interface Props {
  name: string;
  lat: number;
  lng: number;
}

const LocationBox: React.FC<Props> = ({ name, lat, lng }) => {
  return (
    <div className={styles.LocationBox}>
      <div className={styles.LocationNameBox}>
        <div className={styles.LocationContainer}>
          <Icon_location />
          <p>{name}</p>
        </div>
        <div className={styles.FindRoadContainer}>
          <Icon_arrow />
          <p>길찾기</p>
        </div>
      </div>
      <div className={styles.MapBox}>
        <Map latLng={{ lat: lat, lng: lng }} />
      </div>
    </div>
  );
};

export default LocationBox;
