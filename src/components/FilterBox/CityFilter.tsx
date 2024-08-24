import { useEffect, useState } from "react";
import useShopStore from "@/store/useShopStore";

type CityData = {
  [key: string]: string[];
};

export default function CityFilter() {
  const { currentFilter, setFilter } = useShopStore();
  const [citiesData, setCitiesData] = useState<CityData>({});
  const [subAreas, setSubAreas] = useState<string[]>([]);

  useEffect(() => {
    fetch("/data/cities.json")
      .then((response) => response.json())
      .then((data: CityData) => setCitiesData(data))
      .catch((error) => console.error("데이터 로드 실패:", error));
  }, []);

  useEffect(() => {
    if (
      currentFilter.location.state &&
      citiesData[currentFilter.location.state]
    )
      setSubAreas(citiesData[currentFilter.location.state]);
    else setSubAreas([]);
  }, [currentFilter.location.state, citiesData]);

  const handleSetState = (state: string) => {
    setFilter({
      ...currentFilter,
      location: {
        state,
        city: "",
      },
    });
  };

  const handleSetCity = (city: string) => {
    setFilter({
      ...currentFilter,
      location: {
        ...currentFilter.location,
        city,
      },
    });
  };

  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="flex gap-4">
        <div className="flex justify-center items-center gap-2">
          <p className="whitespace-nowrap text-mainColor font-semibold">
            시/도 선택
          </p>
          <select
            id="city-select"
            onChange={(e) => handleSetState(e.target.value)}
            value={
              currentFilter.location.state
                ? currentFilter.location.state
                : "선택"
            }
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

        {currentFilter.location.state && (
          <div className="flex justify-center items-center gap-2">
            <p className="whitespace-nowrap text-mainColor font-semibold">
              구 선택
            </p>
            <select
              id="subarea-select"
              onChange={(e) => handleSetCity(e.target.value)}
              value={
                currentFilter.location.city
                  ? currentFilter.location.city
                  : "선택"
              }
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
