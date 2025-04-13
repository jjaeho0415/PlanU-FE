import { useState, useEffect } from "react";

const useUserLocation = () => {
  const [userCurrentLatLng, setUserCurrentLatLng] = useState<UserLatLngType | null>(null);

  useEffect(() => {
    const updateLocation = (position: GeolocationPosition) => {
      setUserCurrentLatLng((prev) => {
        if (
          prev?.latitude === position.coords.latitude &&
          prev?.longitude === position.coords.longitude
        ) {
          return prev; 
        }
        return {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };
      });
    };

    // 초기 위치 가져오기
    navigator.geolocation.getCurrentPosition(updateLocation, (error) => {
      console.error("Error getting user's location: ", error);
    });

    // 위치 변화 감지 (watchPosition)
    const watchId = navigator.geolocation.watchPosition(
      updateLocation,
      (error) => {
        console.error("Error watching user's location: ", error);
      },
      {
        enableHighAccuracy: true,
        maximumAge: 0,
        timeout: 5000,
      },
    );

    return () => navigator.geolocation.clearWatch(watchId); 
  }, []);

  return userCurrentLatLng;
};

export default useUserLocation;
