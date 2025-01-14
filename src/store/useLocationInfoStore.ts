import { create } from "zustand";
import { persist } from "zustand/middleware";

interface LocationInfoState {
  location: string;
  lat: number;
  lng: number;
  name?: string;
  setLocationInfo: (name: string, location: string, lat: number, lng: number) => void;
}

const useLocationInfoStore = create<LocationInfoState>(
  persist(
    (set) => ({
      name: "",
      location: "",
      lat: 0,
      lng: 0,
      setLocationInfo: (name, location, lat, lng) => set({ name, location, lat, lng }),
    }),
    { name: "selectedLocationInfo-storage" },
  ) as (set: (fn: (state: LocationInfoState) => LocationInfoState) => void) => LocationInfoState,
);

export default useLocationInfoStore;
