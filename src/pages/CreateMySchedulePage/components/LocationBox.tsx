import React from "react";
import styles from "./Inputs.module.scss";
import Icon_search from "../../../assets/Icons/Icon_search.svg?react";

const LocationBox: React.FC = () => {
  return (
    <div className={styles.LocationContainer}>
      <div className={styles.Box}>
        <p className={styles.Title}>장소를 검색하세요.</p>
        <Icon_search />
      </div>
      <div className={styles.MapBox}>map</div>
    </div>
  );
};

export default LocationBox;
