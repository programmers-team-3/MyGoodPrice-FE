import { useEffect, useState } from "react";

type CityData = {
  [key: string]: string[];
};

type Location = {
  city: string;
  subArea: string;
};

type CityFilterProps = {
  handleLocationChange: (location: string | null) => void;
};

export default function CityFilter({ handleLocationChange }: CityFilterProps) {
  const [citiesData, setCitiesData] = useState<CityData>({});
  const [location, setLocation] = useState<Location>({ city: "", subArea: "" });
  const [subAreas, setSubAreas] = useState<string[]>([]);

  useEffect(() => {
    fetch("/data/cities.json")
      .then((response) => response.json())
      .then((data: CityData) => setCitiesData(data))
      .catch((error) => console.error("데이터 로드 실패:", error));
  }, []);

  useEffect(() => {
    if (location.city && citiesData[location.city]) {
      setSubAreas(citiesData[location.city]);
      setLocation((prevLocation) => ({ ...prevLocation, subArea: "" }));
    } else {
      setSubAreas([]);
      setLocation((prevLocation) => ({ ...prevLocation, subArea: "" }));
    }
  }, [location.city, citiesData]);

  const selectedLocation =
    location.city && location.subArea
      ? `${location.city} ${location.subArea}`
      : null;

  useEffect(() => {
    if (selectedLocation) handleLocationChange(selectedLocation);
    else handleLocationChange(null);
  }, [selectedLocation, handleLocationChange]);

  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="flex gap-4">
        <div className="flex justify-center items-center gap-2">
          <p className="whitespace-nowrap text-mainColor font-semibold">
            시/도 선택
          </p>
          <select
            id="city-select"
            onChange={(e) =>
              setLocation(() => ({
                city: e.target.value,
                subArea: "",
              }))
            }
            value={location.city}
            className="w-full px-1 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-mainColor"
          >
            <option value="">X</option>
            {Object.keys(citiesData).map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>

        {location.city && (
          <div className="flex justify-center items-center gap-2">
            <p className="whitespace-nowrap text-mainColor font-semibold">
              구 선택
            </p>
            <select
              id="subarea-select"
              onChange={(e) =>
                setLocation((prevLocation) => ({
                  ...prevLocation,
                  subArea: e.target.value,
                }))
              }
              value={location.subArea}
              className="w-full px-1 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-mainColor"
            >
              <option value="">구 선택</option>
              {subAreas.map((subArea) => (
                <option key={subArea} value={subArea}>
                  {subArea}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>
    </div>
  );
}
