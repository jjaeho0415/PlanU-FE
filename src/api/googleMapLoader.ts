export const loadGoogleMapsAPI = (apiKey: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (typeof google !== "undefined" && google.maps) {
      resolve(); // 이미 로드된 경우
      return;
    }
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&v=weekly&libraries=places,marker`;
    script.async = true;
    script.defer = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Failed to load Google Maps API"));
    document.head.appendChild(script);
  });
};
