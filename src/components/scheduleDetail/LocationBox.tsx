import React, { useEffect, useState } from "react";
import styles from "./Boxes.module.scss";
import Icon_location from "@assets/Icons/scheduleDetail/Icon_location.svg?react";
import Icon_arrow from "@assets/Icons/arrow/Icon_Arrow_upRight.svg?react";
import Map from "@components/map/Map";
import useLocationInfoStore from "@store/useLocationInfoStore";

const LocationBox: React.FC = () => {
  const { lat, lng, name, location } = useLocationInfoStore();
  const [locationName, setLocationName] = useState<string>("");

  useEffect(() => {
    setLocationName(name ?? location);
  }, [name, location]);

  return (
    <div className={styles.LocationBox}>
      <div className={styles.LocationNameBox}>
        <div className={styles.LocationContainer}>
          <Icon_location />
          <p>{locationName}</p>
        </div>
        <div className={styles.FindRoadContainer}>
          <Icon_arrow />
          <p>길찾기</p>
        </div>
      </div>
      <div className={styles.MapBox}>
        <Map latLng={{ latitude: lat, longitude: lng }} />
      </div>
    </div>
  );
};

export default LocationBox;
