import { useEffect, useRef, useState } from "react";
import styles from "./selectLocation.module.scss";
import useLocationInfoStore from "@store/useLocationInfoStore";
import HasTwoIconHeader from "@components/headers/HasTwoIconHeader";
import { useNavigate } from "react-router-dom";
import SearchInput from "../components/SearchInput";
import SearchResultList from "../components/SearchResultList";
import { calculateDistance } from "../../../utils/calculateDistance";
import { initializeMap, createCustomPin, createMarker } from "../../../utils/drawMap";

const SelectLocationPage = () => {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const [inputValue, setInputValue] = useState<string>("");
  const { setLocationInfo } = useLocationInfoStore();
  const [searchResults, setSearchResults] = useState<SearchLocationResultType[]>([]);
  const [selectedLocationInfo, setSelectedLocationInfo] = useState<SearchLocationResultType | null>(
    null,
  );
  const navigate = useNavigate();
  const [userLatLng, setUserLatLng] = useState<UserLatLngType>();
  const [marker, setMarker] = useState<google.maps.marker.AdvancedMarkerElement | null>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);

  useEffect(() => {
    if (inputValue === "") {
      setSearchResults([]);
      setSelectedLocationInfo(null);
      if (userLatLng && mapRef.current) {
        const initMap = async () => {
          try {
            const newMap = await initializeMap(
              mapRef.current!,
              userLatLng,
              import.meta.env.VITE_GOOGLE_MAP_ID,
            );
            const pin = await createCustomPin();
            const initialMarker = await createMarker(newMap, userLatLng, pin.element);
            setMap(newMap);
            setMarker(initialMarker);
          } catch (error) {
            console.error("Error initializing map: ", error);
          }
        };
        initMap();
      }
    }
  }, [inputValue, mapRef.current, userLatLng]);

  useEffect(() => {
    if (map) {
      google.maps.event.trigger(map, "resize");
    }
  }, [map]);

  useEffect(() => {
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
  }, []);

  useEffect(() => {
    const initMap = async () => {
      if (!userLatLng || !mapRef.current) {
        return;
      }
      try {
        const newMap = await initializeMap(
          mapRef.current,
          userLatLng,
          import.meta.env.VITE_GOOGLE_MAP_ID,
        );
        const pin = await createCustomPin();
        const initialMarker = await createMarker(newMap, userLatLng, pin.element);
        setMap(newMap);
        setMarker(initialMarker);
      } catch (error) {
        console.error("Error initializing map: ", error);
      }
    };

    initMap();
  }, [userLatLng, mapRef.current]);

  const handleSearchIconClick = async () => {
    if (!inputValue || !userLatLng || !mapRef.current) {
      return;
    }

    if (!map) {
      try {
        const newMap = await initializeMap(
          mapRef.current,
          userLatLng,
          import.meta.env.VITE_GOOGLE_MAP_ID,
        );
        const pin = await createCustomPin();
        const initialMarker = await createMarker(newMap, userLatLng, pin.element);
        setMap(newMap);
        setMarker(initialMarker);
      } catch (error) {
        console.error("Error initializing map: ", error);
      }
    }

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
      } else {
        console.error("Failed to fetch places: ", status);
      }
    });
  };

  const handleResultClick = async (location: SearchLocationResultType) => {
    if (!mapRef.current || !userLatLng) {
      return;
    }

    const selectedMap = await initializeMap(
      mapRef.current,
      { lat: location.lat, lng: location.lng },
      import.meta.env.VITE_GOOGLE_MAP_ID,
    );
    const pin = await createCustomPin();
    const selectedMarker = await createMarker(
      selectedMap,
      { lat: location.lat, lng: location.lng },
      pin.element,
    );

    setSelectedLocationInfo(location);
    if (marker) {
      marker.map = null;
    }
    setMap(selectedMap);
    setMarker(selectedMarker);
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
            searchResults.length === 0 ? styles.fullHeight : ""
          }`}
          ref={mapRef}
        />
        <div
          className={`${styles.searchResultsContainer} ${
            searchResults.length === 0 ? styles.hidden : ""
          }`}
        >
          {userLatLng && (
            <SearchResultList
              handleResultClick={handleResultClick}
              calculateDistance={calculateDistance}
              selectedLocationInfo={selectedLocationInfo}
              searchResults={searchResults}
              userLatLng={userLatLng}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default SelectLocationPage;
