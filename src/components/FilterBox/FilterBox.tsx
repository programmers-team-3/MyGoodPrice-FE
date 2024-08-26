import { Range, getTrackBackground } from "react-range";
import CityFilter from "./CityFilter";
import CheckBox from "../CheckBox/CheckBox";
import Loading from "../Loading/LoadingBar";
import { theme } from "@/styles/theme";
import Button from "../Button/Button";
import styled from "styled-components";
import useShopStore from "@/store/useShopStore";
import useUserStore from "@/store/useUserStore";
import axios from "axios";
import { filterSearchCriteria } from "@/utils/filterSearchCriteria";

const STEP = 100;
const MIN = 0;
const MAX = 10000;

type FilterBoxProps = {
  rtl: boolean;
  handleCloseModal: () => void;
  handleCategoryString: (name: string | null) => void;
};
export default function FilterBox({
  rtl,
  handleCloseModal,
  handleCategoryString,
}: FilterBoxProps) {
  const { currentFilter, categoryFilter, setFilter, setCurrentShopData } =
    useShopStore();
  const { loading, setLoading } = useUserStore();

  const handleChange = (idx: number, value: string) => {
    const numValue = Number(value);
    if (numValue > 10000 || isNaN(numValue)) return;

    if (idx === 0) {
      setFilter({
        ...currentFilter,
        minPrice: numValue,
      });
    } else {
      setFilter({
        ...currentFilter,
        maxPrice: numValue,
      });
    }
  };

  const handleCheckFilter = (idx: number = 1, isChecked: boolean) => {
    const updatedCheckFilter = [...currentFilter.checkFilter];
    updatedCheckFilter[idx] = isChecked;

    setFilter({
      ...currentFilter,
      checkFilter: updatedCheckFilter,
    });
  };

  // [API] ('/shop') : 필터 검색
  const handleSearch = async () => {
    const { searchMinPrice, searchMaxPrice, searchLocation, searchCategory } =
      filterSearchCriteria(currentFilter);

    const url = `${
      import.meta.env.VITE_PRODUCTION_API_BASE_URL
    }/stores?page=1&limit=${
      currentFilter.limit
    }&category=${searchCategory}&maxPrice=${searchMaxPrice}&minPrice=${searchMinPrice}&location=${searchLocation}&search=null`;

    try {
      setLoading(true);
      const res = await axios.get(url, { withCredentials: true });
      if (searchCategory === null || res.data.length === 0)
        handleCategoryString("전체");
      else handleCategoryString(searchCategory);
      setCurrentShopData(res.data);
      setFilter({
        ...currentFilter,
        isEnd: res.data.length !== currentFilter.limit,
      });
      setLoading(false);
    } catch (error) {
      console.log(error);
    } finally {
      handleCloseModal();
    }
  };

  return (
    <>
      {loading && <Loading text="가게 필터링 하는 중.." />}
      <div className="flex flex-col gap-4 h-full pt-2">
        <MobileLayout className="flex justify-center flex-wrap">
          <Range
            disabled={!currentFilter.checkFilter[0]}
            values={[
              currentFilter.minPrice ?? 0,
              currentFilter.maxPrice ?? 10000,
            ]}
            step={STEP}
            min={MIN}
            max={MAX}
            rtl={rtl}
            onChange={(values) => {
              setFilter({
                ...currentFilter,
                minPrice: values[0],
                maxPrice: values[1],
              });
            }}
            renderTrack={({ props, children }) => (
              <div
                onMouseDown={props.onMouseDown}
                onTouchStart={props.onTouchStart}
                className={` w-full ${
                  currentFilter.checkFilter[0]
                    ? "bg-mainDarkColor"
                    : "bg-subDarkColor"
                }`}
              >
                <div
                  ref={props.ref}
                  style={{
                    height: "4px",
                    width: "100%",
                    borderRadius: "4px",
                    background: getTrackBackground({
                      values: [
                        currentFilter.minPrice ?? 0,
                        currentFilter.maxPrice ?? 10000,
                      ],
                      colors: [
                        theme.subColor,
                        currentFilter.checkFilter[0]
                          ? theme.mainDarkColor
                          : theme.subDarkColor,
                        theme.subColor,
                      ],
                      min: MIN,
                      max: MAX,
                      rtl,
                    }),
                    alignSelf: "center",
                  }}
                >
                  {children}
                </div>
              </div>
            )}
            renderThumb={({ props }) => (
              <div
                {...props}
                key={props.key}
                className={`h-6 w-6 rounded-full ${
                  currentFilter.checkFilter[0]
                    ? "bg-mainDarkColor"
                    : "bg-subDarkColor"
                }`}
              ></div>
            )}
          />
        </MobileLayout>
        <div className="mt-8 flex justify-between items-center gap-2">
          <p className="text-lg text-mainDarkColor font-bold whitespace-nowrap">
            금액 범위 필터
          </p>
          <CheckBox
            isChecked={currentFilter.checkFilter[0]}
            id={0}
            handleCheck={(isChecked: boolean) =>
              handleCheckFilter(0, isChecked)
            }
          />
          <div className="w-full flex gap-4 justify-end">
            <input
              type="number"
              disabled={!currentFilter.checkFilter[0]}
              value={currentFilter.minPrice?.toString()}
              onChange={(e) => handleChange(0, e.target.value)}
              className={`w-16 px-1 border border-subDarkColor ${
                currentFilter.checkFilter[0] ? "" : "text-subDarkColor"
              } rounded focus:outline-none focus:ring-2 focus:ring-mainColor focus:border-transparent`}
            />
            ~
            <input
              type="number"
              disabled={!currentFilter.checkFilter[0]}
              value={currentFilter.maxPrice?.toString()}
              onChange={(e) => handleChange(1, e.target.value)}
              className={`w-16 px-1 border border-subDarkColor ${
                currentFilter.checkFilter[0] ? "" : "text-subDarkColor"
              } rounded focus:outline-none focus:ring-2 focus:ring-mainColor focus:border-transparent`}
            />
          </div>
        </div>
        <div className="mt-8 flex justify-between items-center gap-2">
          <p className="text-lg text-mainDarkColor font-bold whitespace-nowrap">
            시/도/구 필터
          </p>
          <CheckBox
            isChecked={currentFilter.checkFilter[1]}
            id={1}
            handleCheck={(isChecked: boolean) =>
              handleCheckFilter(1, isChecked)
            }
          />
          <MobileLayout className="w-full flex justify-end">
            {currentFilter.location.state &&
            currentFilter.location.city &&
            currentFilter.checkFilter[1]
              ? `${currentFilter.location.state} ${currentFilter.location.city}`
              : "선택하지 않음"}
          </MobileLayout>
        </div>
        {currentFilter.checkFilter[1] && <CityFilter />}
        <div className="mt-8 flex justify-between items-center gap-2">
          <p className="text-lg text-mainDarkColor font-bold whitespace-nowrap">
            카테고리 필터
          </p>
          <CheckBox
            isChecked={currentFilter.checkFilter[2]}
            id={2}
            handleCheck={(isChecked: boolean) =>
              handleCheckFilter(2, isChecked)
            }
          />
          <div className="w-full flex gap-2 overflow-x-scroll">
            {currentFilter.checkFilter[2] &&
              categoryFilter.map((data) => {
                return (
                  <Button
                    key={data.id}
                    isActive={currentFilter.category === data.name}
                    size="small"
                    name={data.name}
                    handleSetCurrent={() =>
                      setFilter({
                        ...currentFilter,
                        category: data.name,
                      })
                    }
                  />
                );
              })}
          </div>
        </div>

        <div className="flex flex-col mt-auto mb-4">
          <Button
            isActive={true}
            size="large"
            name={"검색"}
            handleSetCurrent={handleSearch}
          />
        </div>
      </div>
    </>
  );
}

const MobileLayout = styled.div`
  @media (max-width: 542px) {
    display: none;
  }
`;
