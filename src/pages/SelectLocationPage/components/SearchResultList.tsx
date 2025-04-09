import SearchResultItem from "./SearchResultItem";

interface Props {
  searchResults: SearchLocationResultType[];
  calculateDistance: (lat1: number, lng1: number, lat2: number, lng2: number) => number;
  userLatLng: UserLatLngType;
  selectedLocationInfo: SearchLocationResultType | null;
  handleResultClick: (location: SearchLocationResultType) => void;
}

const SearchResultList: React.FC<Props> = ({
  searchResults,
  calculateDistance,
  userLatLng,
  selectedLocationInfo,
  handleResultClick,
}) => {
  return (
    <>
      {searchResults.map((result, index) => {
        const distance = calculateDistance(
          userLatLng.latitude,
          userLatLng.longitude,
          result.lat,
          result.lng,
        ).toFixed(1); // 소수점 한 자리까지 표시

        return (
          <SearchResultItem
            key={index}
            selectedLocationInfo={selectedLocationInfo}
            handleResultClick={handleResultClick}
            distance={distance}
            result={result}
          />
        );
      })}
    </>
  );
};

export default SearchResultList;
