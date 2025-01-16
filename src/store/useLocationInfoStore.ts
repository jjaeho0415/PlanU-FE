import { create } from "zustand";
import { persist } from "zustand/middleware";

interface LocationInfoState {
  location: string;
  lat: number;
  lng: number;
  name: string;
  setLocationInfo: (location: string, lat: number, lng: number, name: string) => void;
}

const useLocationInfoStore = create<LocationInfoState>(
  persist(
    (set) => ({
      location: "",
      lat: 0,
      lng: 0,
      name: "",
      setLocationInfo: (location, lat, lng, name) => set({ location, lat, lng, name }),
    }),
    { name: "selectedLocationInfo-storage" },
  ) as (set: (fn: (state: LocationInfoState) => LocationInfoState) => void) => LocationInfoState,
);

export default useLocationInfoStore;
