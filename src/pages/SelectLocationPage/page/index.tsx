import { useEffect, useRef, useState } from "react";
import styles from "./selectLocation.module.scss";
import useLocationInfoStore from "@store/useLocationInfoStore";
import HasTwoIconHeader from "@components/headers/HasTwoIconHeader";
import { useNavigate } from "react-router-dom";
import { loadGoogleMapsAPI } from "@api/googleMapLoader";
import SearchInput from "../components/SearchInput";
import SearchResultList from "../components/SearchResultList";
import { calculateDistance } from "../../../constants/calculateDistance";

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
  const [marker, setMarker] = useState<google.maps.marker.AdvancedMarkerElement | null>(null);

  useEffect(() => {
    if (inputValue === "") {
      setSearchResults([]);
    }
  }, [inputValue, searchResults]);

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
        radius: 10000,
      };

      service.textSearch(request, (results, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK && results) {
          const formattedResults = results.map((place) => ({
            name: String(place.name),
            formatted_address: String(place.formatted_address),
            lat: Number(place.geometry?.location?.lat()),
            lng: Number(place.geometry?.location?.lng()),
          }));
          const sortedResults = formattedResults.sort((a, b) => {
            const distanceA = calculateDistance(userLatLng.lat, userLatLng.lng, a.lat, a.lng);
            const distanceB = calculateDistance(userLatLng.lat, userLatLng.lng, b.lat, b.lng);
            return distanceA - distanceB;
          });

          setSearchResults(sortedResults);
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
        const { AdvancedMarkerElement, PinElement } = (await google.maps.importLibrary(
          "marker",
        )) as google.maps.MarkerLibrary;

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

        const pin = new PinElement({
          scale: 1.2,
          borderColor: "#F6ECFE",
          background: "#A676B2",
          glyphColor: "#F6ECFE",
          // glyph: "T",
        });

        const initialMarker = new AdvancedMarkerElement({
          map: newMap,
          position: userLatLng,
          content: pin.element,
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

  const handleResultClick = async (location: SearchLocationResultType) => {
    if (!map) return;
    const { AdvancedMarkerElement, PinElement } = (await google.maps.importLibrary(
      "marker",
    )) as google.maps.MarkerLibrary;
    setSelectedLocationInfo(location);

    // 지도 중심 이동
    map.setCenter({ lat: location.lat, lng: location.lng });

    // 기존 핀 제거
    if (marker) {
      marker.map = null;
    }

    const pin = new PinElement({
      scale: 1.2,
      borderColor: "#F6ECFE",
      background: "#A676B2",
      glyphColor: "#F6ECFE",
      // glyph: "T",
    });

    // 새로운 핀 추가
    const newMarker = new AdvancedMarkerElement({
      map,
      position: { lat: location.lat, lng: location.lng },
      content: pin.element,
    });

    setMarker(newMarker);
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
