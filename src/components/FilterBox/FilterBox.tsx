import { Range, getTrackBackground } from "react-range";
import { useState } from "react";

const STEP = 100;
const MIN = 0;
const MAX = 10000;
// 최솟값, 최댓값 수정 필요
export default function FilterBox({ rtl }: { rtl: boolean }) {
  const [values, setValues] = useState([0, 5000]);

  const handleChange = (idx: number, value: string) => {
    if (idx === 1 && Number(value) < values[0]) return;
    if (idx === 0 && Number(value) > values[1]) return;
    const updatedValues = [...values];
    updatedValues[idx] = Number(value);
    setValues(updatedValues);
  };
  return (
    <>
      <div className="flex justify-center flex-wrap">
        <Range
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
              className=" w-full bg-subDarkColor"
            >
              <div
                ref={props.ref}
                style={{
                  height: "4px",
                  width: "100%",
                  borderRadius: "4px",
                  background: getTrackBackground({
                    values,
                    colors: ["#ccc", "#548BF4", "#ccc"],
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
              className="h-6 w-6 rounded-full bg-mainDarkColor"
            ></div>
          )}
        />
      </div>
      <div className="my-16 flex justify-center items-center gap-2">
        <h3>금액 상한선</h3>
        <input
          type="number"
          value={values[0]}
          onChange={(e) => handleChange(0, e.target.value)}
          className="w-24 px-3 py-2 border border-subDarkColor rounded-md
          shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        ~
        <input
          type="number"
          value={values[1]}
          onChange={(e) => handleChange(1, e.target.value)}
          className="w-24 px-3 py-2 border border-subDarkColor rounded-md
          shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
    </>
  );
}
