import { useEffect, useRef, useState } from "react";
import styles from "./selectLocation.module.scss";
import useLocationInfoStore from "@store/useLocationInfoStore";
import HasTwoIconHeader from "@components/headers/HasTwoIconHeader";
import { useNavigate } from "react-router-dom";
import { loadGoogleMapsAPI } from "@api/googleMapLoader";
import SearchInput from "../components/SearchInput";

import SearchResultList from "../components/SearchResultList";

const SelectLocationPage = () => {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const [inputValue, setInputValue] = useState<string>("");
  const { setLocationInfo } = useLocationInfoStore();
  const [searchResults, setSearchResults] = useState<SearchLocationResultType[]>([]);
  const [selectedLocationInfo, setSelectedLocationInfo] = useState<SearchLocationResultType | null>(
    null,
  );
  const navigate = useNavigate();
  const [userLatLng, setUserLatLng] = useState<UserLatLngType>({
    lat: 0,
    lng: 0,
  });
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [marker, setMarker] = useState<google.maps.Marker | null>(null);

  const handleSearchIconClick = async () => {
    if (!inputValue) {
      return;
    }

    try {
      await loadGoogleMapsAPI(import.meta.env.VITE_GOOGLE_MAP_API_KEY);
      const { PlacesService } = (await google.maps.importLibrary(
        "places",
      )) as google.maps.PlacesLibrary;

      const service = new PlacesService(mapRef.current as HTMLDivElement);

      const request: google.maps.places.TextSearchRequest = {
        query: inputValue,
        location: userLatLng,
        radius: 10000, // 10km
      };

      service.textSearch(request, (results, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK && results) {
          const formattedResults = results.map((place) => ({
            name: String(place.name),
            formatted_address: String(place.formatted_address),
            lat: Number(place.geometry?.location?.lat()),
            lng: Number(place.geometry?.location?.lng()),
          }));
          setSearchResults(formattedResults);
          if (map) {
            map.setCenter(userLatLng);
          }
        } else {
          console.error("Failed to fetch places: ", status);
        }
      });
    } catch (error) {
      console.error("Error searching for places: ", error);
    }
  };

  useEffect(() => {
    async function initMap() {
      try {
        await loadGoogleMapsAPI(import.meta.env.VITE_GOOGLE_MAP_API_KEY);
        if (userLatLng.lat === 0 && userLatLng.lng === 0) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              setUserLatLng({
                lat: position.coords.latitude,
                lng: position.coords.longitude,
              });
            },
            (error) => {
              console.error("Error getting user's location: ", error);
            },
          );
        }

        const newMap = new google.maps.Map(mapRef.current as HTMLElement, {
          center: userLatLng,
          zoom: 16,
          mapId: import.meta.env.VITE_GOOGLE_MAP_ID,
          fullscreenControl: false,
          mapTypeControl: false,
          zoomControl: false,
          streetViewControl: false,
        });
        setMap(newMap);

        const initialMarker = new google.maps.Marker({
          map: newMap,
          position: userLatLng,
        });
        setMarker(initialMarker);
      } catch (error) {
        console.error("Error initializing map: ", error);
      }
    }
    if (mapRef.current) {
      initMap();
    }
  }, [mapRef, userLatLng]);

  const handleResultClick = (location: SearchLocationResultType) => {
    if (!map) return;

    setSelectedLocationInfo(location);

    // 지도 중심 이동
    map.setCenter({ lat: location.lat, lng: location.lng });

    // 기존 핀 제거
    if (marker) {
      marker.setMap(null); // 이전 핀을 지도에서 제거
    }

    // 새로운 핀 추가
    const newMarker = new google.maps.Marker({
      map,
      position: { lat: location.lat, lng: location.lng },
    });

    setMarker(newMarker); // 새 핀을 상태에 저장
  };

  const calculateDistance = (lat1: number, lng1: number, lat2: number, lng2: number) => {
    const toRad = (value: number) => (value * Math.PI) / 180;
    const R = 6371; // 지구 반지름 (km)
    const dLat = toRad(lat2 - lat1);
    const dLng = toRad(lng2 - lng1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) * Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const handleSave = () => {
    if (selectedLocationInfo) {
      setLocationInfo(
        selectedLocationInfo.formatted_address,
        selectedLocationInfo.lat,
        selectedLocationInfo.lng,
        selectedLocationInfo.name,
      );
    }
    navigate(-1);
  };

  return (
    <div className={styles.mainContainer}>
      <HasTwoIconHeader
        title="검색"
        rightType="checkIcon"
        handleLeftClick={() => {
          navigate(-1);
        }}
        handleRightClick={handleSave}
        backgroundColor="white"
      />
      <div className={styles.contentContainer}>
        <div className={styles.searchInputContainer}>
          <SearchInput
            inputValue={inputValue}
            setInputValue={setInputValue}
            handleSearchIconClick={handleSearchIconClick}
          />
        </div>
        <div
          className={`${styles.mapContainer} ${
            inputValue === "" || searchResults.length === 0 ? styles.fullHeight : ""
          }`}
          ref={mapRef}
        />
        <div
          className={`${styles.searchResultsContainer} ${
            inputValue === "" || searchResults.length === 0 ? styles.hidden : ""
          }`}
        >
          <SearchResultList
            handleResultClick={handleResultClick}
            calculateDistance={calculateDistance}
            selectedLocationInfo={selectedLocationInfo}
            searchResults={searchResults}
            userLatLng={userLatLng}
          />
        </div>
      </div>
    </div>
  );
};

export default SelectLocationPage;
