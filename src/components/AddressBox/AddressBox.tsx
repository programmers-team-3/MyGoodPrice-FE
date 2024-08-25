import { useState } from "react";
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
  };

  const setGeoLocation = useGeoLocation((state) => state.setGeoLocation);
  const latitude = useGeoLocation((state) => state.latitude);
  const longitude = useGeoLocation((state) => state.longitude);

  const getLocation = () => {
    const fetchLocation = async () => {
      try {
        await getCurrentLocation(setGeoLocation);
      } catch (error) {
        alert("위치정보가 없으면 사용할 수 없는 서비스입니다. 동의해주세요!");
      }
    };

    fetchLocation();
  };

  const handleLocationRequest = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        () => {
          // 위치 정보 동의가 되었을 경우
          getLocation();
        },
        (error) => {
          // 위치 정보 동의가 거부되었을 경우
          if (error.code === error.PERMISSION_DENIED) {
            alert("위치 정보 권한이 필요합니다. 동의해주세요!");
          } else {
            alert("위치 정보를 가져오는 데 문제가 발생했습니다.");
          }
        }
      );
    } else {
      alert("이 브라우저는 위치 정보 서비스를 지원하지 않습니다.");
    }
  };

  const handleCurrentLocationButtonClick = () => {
    setRole("currentPosition");
    handleLocationRequest(); // 위치 정보 요청
  };

  return (
    <div className="right-0 w-[60%] ">
      {role === null && (
        <div className="flex flex-row justify-end gap-4 mx-auto">
          <Button
            isActive={true}
            name="현재 위치 정보 받기"
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
      {role === "currentPosition" && (
        <div>
          <h2>위치 정보</h2>
          <p>위도: {latitude}</p>
          <p>경도: {longitude}</p>
        </div>
      )}
    </div>
  );
}
