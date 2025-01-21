import React from "react";
import styles from "./Inputs.module.scss";
import Icon_search from "@assets/Icons/Icon_search.svg?react";
import Map from "@components/map/Map";
import { useNavigate } from "react-router-dom";

interface props {
  location?: string;
}

const LocationBox: React.FC<props> = ({ location = "" }) => {
  const navigate = useNavigate();

  return (
    <div className={styles.LocationContainer} onClick={() => navigate("/selectLocation")}>
      <div className={styles.Box}>
        {location === "" ? (
          <p className={styles.Title}>장소를 검색하세요.</p>
        ) : (
          <p className={styles.LocationName}>{location}</p>
        )}
        <Icon_search />
      </div>
      <div className={styles.MapBox}>
        <Map latLng={{ lat: 0, lng: 0 }} />
      </div>
    </div>
  );
};

export default LocationBox;
