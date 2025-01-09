import styles from "./map.module.scss";

interface Props{
    selectedLocationInfo?: ILocationInfoType;
}

const Map: React.FC<Props> = ({ selectedLocationInfo }) => {
  return <div className={styles.mapContainer}>Map</div>;
};

export default Map