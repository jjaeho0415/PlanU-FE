import { loadGoogleMapsAPI } from "@api/googleMapLoader";

// 역지오코딩 : 위도 경도를 이용해 주소로 변환
const ReverseGeocoding = (userLatLng: UserLatLngType): Promise<string> => {
  return new Promise(async(resolve, reject) => {
    await loadGoogleMapsAPI(import.meta.env.VITE_GOOGLE_MAP_API_KEY);
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ location: userLatLng, language: "ko" }, (results, status) => {
      if (status === "OK") {
        if (results && results.length > 0) {
          const koreaAddress = results[0].formatted_address;
          resolve(koreaAddress);
        } else {
          reject(new Error("No results found"));
        }
      } else {
        reject(new Error("Geocoder failed due to: " + status));
      }
    });
  });
};

// 지오코딩 : 주소를 이용해 위도 경도로 변환
const Geocoding = (address: string): Promise<{ userLat: number; userLng: number }> => {
  return new Promise(async (resolve, reject) => {
    
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ address: address }, (results: google.maps.GeocoderResult[] | null) => {
      if (results !== null) {
        const location = results[0].geometry.location;
        const userLat = location.lat();
        const userLng = location.lng();
        resolve({ userLat, userLng });
      } else {
        reject("Geocoding failed");
      }
    });
  });
};

export { ReverseGeocoding, Geocoding };
