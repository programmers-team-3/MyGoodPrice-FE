import { useEffect, useState } from "react";
import DaumPostcode, { Address } from "react-daum-postcode";
import Button from "../Button/Button";
import useGeoLocation from "@/store/useGeoLocation";
import { getCurrentLocation } from "@/utils/getCurLocation";

type AddressBoxProps = {
  handleAddress: (address: Address) => void;
};

type roleTypes = "currentPosition" | "search" | null;

export default function AddressBox({ handleAddress }: AddressBoxProps) {
  const [role, setRole] = useState<roleTypes>(null);
  const completeHandler = (data: Address) => {
    handleAddress(data);
    console.log(data);
  };

  const { latitude, longitude, setGeoLocation } = useGeoLocation();

  useEffect(() => {
    console.log(role);
  }, [role]);

  const handleCurrentLocationButtonClick = async () => {
    try {
      await getCurrentLocation(setGeoLocation);
      console.log("위치 정보가 업데이트되었습니다.");
    } catch (error) {
      console.error("위치 정보 업데이트에 실패했습니다.", error);
    }
  };

  return (
    <div className="right-0 w-[60%] ">
      {role === null && (
        <div className="flex flex-row justify-end gap-4 mx-auto">
          <Button
            isActive={latitude && longitude ? false : true}
            name={
              latitude && longitude
                ? "다시 위치정보 받기"
                : "현재 위치정보 받기"
            }
            size="small"
            handleSetCurrent={handleCurrentLocationButtonClick}
          />
          <Button
            isActive={true}
            name="주소 검색하기"
            size="small"
            handleSetCurrent={() => setRole("search")}
          />
        </div>
      )}

      {role === "search" && (
        <DaumPostcode
          onComplete={completeHandler}
          style={{
            position: "fixed",
            width: "45%",
            height: "50%",
            padding: 0,
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 100,
          }}
        />
      )}
    </div>
  );
}
