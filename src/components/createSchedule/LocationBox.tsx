import React, { useEffect, useState } from "react";
import styles from "./Inputs.module.scss";
import Icon_search from "@assets/Icons/Icon_search.svg?react";
import Map from "@components/map/Map";
import { useNavigate } from "react-router-dom";
import useLocationInfoStore from "@store/useLocationInfoStore";

const LocationBox: React.FC = () => {
  const navigate = useNavigate();
  const { lat, lng, name, location } = useLocationInfoStore();
  const [locationName, setLocationName] = useState<string>("");

  useEffect(() => {
    setLocationName(name ?? location);
  }, [name, location]);

  return (
    <div className={styles.LocationContainer} onClick={() => navigate("/selectLocation")}>
      <div className={styles.Box}>
        {locationName ? (
          <p className={styles.LocationName}>{locationName}</p>
        ) : (
          <p className={styles.Title}>장소를 검색하세요.</p>
        )}
        <Icon_search />
      </div>
      <div className={styles.MapBox}>
        <Map latLng={{ latitude: lat, longitude: lng }} />
      </div>
    </div>
  );
};

export default LocationBox;
