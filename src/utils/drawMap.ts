import { loadGoogleMapsAPI } from "@api/googleMapLoader";

export const initializeMap = async (
  mapContainer: HTMLDivElement,
  center: google.maps.LatLngLiteral,
  mapId: string,
): Promise<google.maps.Map> => {
  await loadGoogleMapsAPI(import.meta.env.VITE_GOOGLE_MAP_API_KEY);
  return new google.maps.Map(mapContainer, {
    center,
    zoom: 16,
    mapId,
    fullscreenControl: false,
    mapTypeControl: false,
    zoomControl: false,
    streetViewControl: false,
  });
};

export const createCustomPin = async (): Promise<google.maps.marker.PinElement> => {
  const { PinElement } = (await google.maps.importLibrary("marker")) as google.maps.MarkerLibrary;
  return new PinElement({
    scale: 1.2,
    borderColor: "#F6ECFE",
    background: "#A676B2",
    glyphColor: "#F6ECFE",
  });
};

export const createMarker = async (
  map: google.maps.Map,
  position: google.maps.LatLngLiteral,
  pinElement: HTMLElement,
): Promise<google.maps.marker.AdvancedMarkerElement> => {
  const { AdvancedMarkerElement } = (await google.maps.importLibrary(
    "marker",
  )) as google.maps.MarkerLibrary;

  return new AdvancedMarkerElement({
    map,
    position,
    content: pinElement,
  });
};
