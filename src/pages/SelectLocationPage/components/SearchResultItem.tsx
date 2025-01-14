import styles from "./searchResultItem.module.scss";
import SelectedLocationIcon from "@assets/Icons/map/selectedLocationIcon.svg?react";
import LocationIcon from "@assets/Icons/map/locationIcon.svg?react";

interface Props {
  distance: string;
  selectedLocationInfo: SearchLocationResultType | null;
  handleResultClick: (location: SearchLocationResultType) => void;
    result: SearchLocationResultType;
}

const SearchResultItem: React.FC<Props> = ({
  distance,
  selectedLocationInfo,
    handleResultClick,
  result
}) => {
  return (
    <div
      className={`${styles.searchResultItem} ${
        selectedLocationInfo?.lat === result.lat && selectedLocationInfo?.lng === result.lng
          ? styles.selectedItem
          : ""
      }`}
      onClick={() => handleResultClick(result)}
    >
      <div>
        {selectedLocationInfo?.lat === result.lat && selectedLocationInfo?.lng === result.lng ? (
          <SelectedLocationIcon />
        ) : (
          <LocationIcon />
        )}
        <div className={styles.distance}>{distance}km</div>
      </div>

      <div className={styles.selectedInfo}>
        <p className={styles.name}>{result.name || result.formatted_address}</p>
        <p className={styles.address}>{result.formatted_address}</p>
      </div>
    </div>
  );
};

export default SearchResultItem;
