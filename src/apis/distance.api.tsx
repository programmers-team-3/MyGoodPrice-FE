import axios from "axios";

// interface MenuItem {
//   id: number;
//   menu: string;
//   price: number;
// }

// interface LocationResponse {
//   name: string;
//   state: string;
//   city: string;
//   category: string;
//   address: string;
//   tel: string;
//   menu: MenuItem[];
//   likes: number;
// }

const API_BASE_URL = import.meta.env.VITE_PRODUCTION_API_BASE_URL;

export const fetchDistanceData = async (
  longitude: number,
  latitude: number,
  distance: number
) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/locations`, {
      params: {
        longitude,
        latitude,
        distance,
      },
    });
    return response.data;
  } catch (err) {
    console.error("Error fetching locations:", err);
  }
};
