import { create } from "zustand";

interface GeoLocationState {
  latitude: number | null;
  longitude: number | null;
  setGeoLocation: (latitude: number | null, longitude: number | null) => void;
}

const useGeoLocationStore = create<GeoLocationState>((set) => ({
  latitude: null,
  longitude: null,
  setGeoLocation: (latitude, longitude) => set({ latitude, longitude }),
}));

export default useGeoLocationStore;
