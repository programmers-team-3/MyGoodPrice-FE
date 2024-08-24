import { FilterTypes } from "@/types";

export const filterSearchCriteria = (currentFilter: FilterTypes) => {
  const searchMinPrice = currentFilter.checkFilter[0]
    ? currentFilter.minPrice
    : null;

  const searchMaxPrice = currentFilter.checkFilter[0]
    ? currentFilter.maxPrice
    : null;

  const searchLocation =
    currentFilter.checkFilter[1] &&
    currentFilter.location.state &&
    currentFilter.location.city
      ? `${currentFilter.location.state} ${currentFilter.location.city}`
      : null;

  const searchCategory =
    !currentFilter.checkFilter[2] ||
    currentFilter.category === null ||
    currentFilter.category === "전체"
      ? null
      : currentFilter.category;

  return {
    searchMinPrice,
    searchMaxPrice,
    searchLocation,
    searchCategory,
  };
};
