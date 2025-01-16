import React from "react";
import styles from "./Inputs.module.scss";
import Icon_search from "@assets/Icons/Icon_search.svg?react";
import Map from "@components/map/Map";

const LocationBox: React.FC = () => {
  return (
    <div className={styles.LocationContainer}>
      <div className={styles.Box}>
        <p className={styles.Title}>장소를 검색하세요.</p>
        <Icon_search />
      </div>
      <div className={styles.MapBox}>
        <Map latLng={{ lat: 0, lng: 0 }} />
      </div>
    </div>
  );
};

export default LocationBox;
