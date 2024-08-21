import { Range, getTrackBackground } from "react-range";
import { useState } from "react";
import CityFilter from "./CityFilter";
import CheckBox from "../CheckBox/CheckBox";
import { theme } from "@/styles/theme";
import Button from "../Button/Button";
import { dummyFoodFilterData } from "@/store/data";
import styled from "styled-components";

const STEP = 100;
const MIN = 0;
const MAX = 10000;
// 최솟값, 최댓값 수정 필요
export default function FilterBox({ rtl }: { rtl: boolean }) {
  const [values, setValues] = useState<number[]>([0, 10000]);
  const [rangeFilter, setRangeFilter] = useState<boolean[]>([true, true, true]);
  const [location, setLocation] = useState<string | null>(null);
  const [category, setCategory] = useState<number | null>(1);

  const handleChange = (idx: number, value: string) => {
    const numValue = Number(value);
    // if (idx === 0 && numValue > values[1]) return;
    // if (idx === 1 && numValue < values[0]) return;
    if (numValue > 10000 || isNaN(numValue)) return;
    const updatedValues = [...values];
    updatedValues[idx] = numValue;
    setValues(updatedValues);
  };

  const handleRangeFilter = (idx: number = 1, isChecked: boolean) => {
    const updatedFilter = [...rangeFilter];
    updatedFilter[idx] = isChecked;
    setRangeFilter(updatedFilter);
  };

  const handleSearch = () => {
    console.log("search");
  };

  return (
    <div className="flex flex-col gap-4 h-full pt-2">
      <div className="flex justify-center flex-wrap">
        <Range
          disabled={!rangeFilter[0]}
          values={values}
          step={STEP}
          min={MIN}
          max={MAX}
          rtl={rtl}
          onChange={(values) => {
            setValues(values);
          }}
          renderTrack={({ props, children }) => (
            <div
              onMouseDown={props.onMouseDown}
              onTouchStart={props.onTouchStart}
              className={` w-full ${
                rangeFilter[0] ? "bg-mainDarkColor" : "bg-subDarkColor"
              }`}
            >
              <div
                ref={props.ref}
                style={{
                  height: "4px",
                  width: "100%",
                  borderRadius: "4px",
                  background: getTrackBackground({
                    values,
                    colors: [
                      theme.subColor,
                      rangeFilter[0] ? theme.mainDarkColor : theme.subDarkColor,
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
                rangeFilter[0] ? "bg-mainDarkColor" : "bg-subDarkColor"
              }`}
            ></div>
          )}
        />
      </div>
      <div className="mt-8 flex justify-between items-center gap-2">
        <p className="text-lg text-mainDarkColor font-bold whitespace-nowrap">
          금액 상한선 필터
        </p>
        <CheckBox
          isChecked={rangeFilter[0]}
          id={0}
          handleCheck={(isChecked: boolean) => handleRangeFilter(0, isChecked)}
        />
        <MobileLayout className="w-full flex gap-4 justify-end overflow-x-scroll">
          <input
            type="number"
            disabled={!rangeFilter[0]}
            value={values[0].toString()}
            onChange={(e) => handleChange(0, e.target.value)}
            className={`w-20 px-1 border border-subDarkColor ${
              rangeFilter[0] ? "" : "text-subDarkColor"
            } rounded focus:outline-none focus:ring-2 focus:ring-mainColor focus:border-transparent`}
          />
          ~
          <input
            type="number"
            disabled={!rangeFilter[0]}
            value={values[1].toString()}
            onChange={(e) => handleChange(1, e.target.value)}
            className={`w-20 px-1 border border-subDarkColor ${
              rangeFilter[0] ? "" : "text-subDarkColor"
            } rounded focus:outline-none focus:ring-2 focus:ring-mainColor focus:border-transparent`}
          />
        </MobileLayout>
      </div>
      <div className="mt-8 flex justify-between items-center gap-2">
        <p className="text-lg text-mainDarkColor font-bold whitespace-nowrap">
          시/도 필터
        </p>
        <CheckBox
          isChecked={rangeFilter[1]}
          id={1}
          handleCheck={(isChecked: boolean) => handleRangeFilter(1, isChecked)}
        />
        <MobileLayout className="w-full flex justify-end">
          {location ? location : "선택하지 않음"}
        </MobileLayout>
      </div>
      {rangeFilter[1] && (
        <CityFilter
          handleLocationChange={(location: string | null) =>
            setLocation(location)
          }
        />
      )}
      <div className="mt-8 flex justify-between items-center gap-2">
        <p className="text-lg text-mainDarkColor font-bold whitespace-nowrap">
          카테고리 필터
        </p>
        <CheckBox
          isChecked={rangeFilter[2]}
          id={2}
          handleCheck={(isChecked: boolean) => handleRangeFilter(2, isChecked)}
        />
        <div className="w-full flex gap-2 overflow-x-scroll">
          {rangeFilter[2] &&
            dummyFoodFilterData.map((data) => {
              return (
                <Button
                  key={data.id}
                  isActive={category === data.id}
                  size="small"
                  name={data.name}
                  handleSetCurrent={() => setCategory(data.id)}
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
  );
}

const MobileLayout = styled.div`
  @media (max-width: 542px) {
    display: none;
  }
`;
