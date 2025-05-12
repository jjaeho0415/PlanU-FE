import { loadGoogleMapsAPI } from "@api/googleMapLoader";

export const initializeMap = async (
  mapContainer: HTMLDivElement,
  center: google.maps.LatLngLiteral,
  mapId: string,
  zoom?: number,
): Promise<google.maps.Map> => {
  await loadGoogleMapsAPI(import.meta.env.VITE_GOOGLE_MAP_API_KEY);
  return new google.maps.Map(mapContainer, {
    center,
    zoom: zoom ? zoom : 17,
    mapId,
    fullscreenControl: false,
    mapTypeControl: false,
    zoomControl: false,
    streetViewControl: false,
  });
};

export const createCustomPin = async ({
  scale = 1.2,
  glyph,
  type = "default",
  isClicked,
}: {
  scale?: number;
  glyph?: string;
  type?: "default" | "sharing" | "arrivalPin";
  isClicked?: boolean;
} = {}) => {
  if (type === "default") {
    const { PinElement } = (await google.maps.importLibrary("marker")) as google.maps.MarkerLibrary;
    return new PinElement({
      scale: scale,
      borderColor: "#F6ECFE",
      background: "#A676B2",
      glyphColor: "#F6ECFE",
    });
  }
  const pinElement = document.createElement("div");
  pinElement.style.position = "relative";
  pinElement.style.width = type === "arrivalPin" ? "25px" : "46px";
  pinElement.style.height = type === "arrivalPin" ? "42px" : "45px";
  if (type === "sharing") {
    pinElement.style.borderRadius = "50%";
    pinElement.style.overflow = "hidden";
    pinElement.style.boxShadow = "0 4px 8px rgba(0,0,0,0.3)";
    pinElement.style.backgroundColor = "#fff";
    pinElement.style.display = "flex";
    pinElement.style.alignItems = "center";
    pinElement.style.justifyContent = "center";
    pinElement.style.border = isClicked ? "3px solid #5217FA" : "#fff";
    pinElement.style.width = isClicked ? "60px" : "46px";
    pinElement.style.height = isClicked ? "60px" : "45px";
  }

  if (glyph) {
    const img = document.createElement("img");
    img.src = glyph;
    img.alt = "Profile";
    img.style.width = "100%";
    img.style.height = "100%";
    if (type === "sharing") {
      img.style.borderRadius = "50%";
      img.style.objectFit = "cover";
    }

    pinElement.appendChild(img);
  }

  return { element: pinElement };
};

export const createMarker = async (
  map: google.maps.Map,
  position: google.maps.LatLngLiteral,
  pinElement: HTMLElement,
  type?: "select" | "sharing",
): Promise<google.maps.marker.AdvancedMarkerElement> => {
  const { AdvancedMarkerElement } = (await google.maps.importLibrary(
    "marker",
  )) as google.maps.MarkerLibrary;

  if (type === "select") {
    return new AdvancedMarkerElement({
      map,
      position,
      content: pinElement,
      gmpDraggable: true,
    });
  }

  return new AdvancedMarkerElement({
    map,
    position,
    content: pinElement,
  });
};
