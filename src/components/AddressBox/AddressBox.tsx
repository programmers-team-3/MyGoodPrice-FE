import Button from "../Button/Button";
import useGeoLocation from "@/store/useGeoLocationStore";
import { getCurrentLocation } from "@/utils/getCurLocation";

declare global {
  interface Window {
    daum: any;
  }
}

type AddressBoxProps = {
  handleAddress: (address: string) => void;
};

export default function AddressBox({ handleAddress }: AddressBoxProps) {
  const { latitude, longitude, setGeoLocation } = useGeoLocation();

  const handleCurrentLocationButtonClick = async () => {
    try {
      await getCurrentLocation(setGeoLocation);
      // console.log("위치 정보가 업데이트되었습니다.");
    } catch (error) {
      console.error("위치 정보 업데이트에 실패했습니다.", error);
    }
  };

  const openPostcodePopup = () => {
    new window.daum.Postcode({
      oncomplete: function (data: any) {
        const fullAddress = data.roadAddress;
        const siDo = data.sido;
        const siGunGu = data.sigungu;
        const roadNameAddress = data.roadAddress;

        const geocoder = new window.kakao.maps.services.Geocoder();
        geocoder.addressSearch(
          fullAddress,
          function (result: any, status: any) {
            if (status === window.kakao.maps.services.Status.OK) {
              const addressLat = parseFloat(result[0].y);
              const addressLong = parseFloat(result[0].x);

              // 데이터 객체를 생성하여 handleAddress로 전달합니다.
              const addressData = {
                fullAddress,
                siDo,
                siGunGu,
                roadNameAddress,
                latitude: addressLat,
                longitude: addressLong,
              };

              handleAddress(addressData.fullAddress); // handleAddress 호출
              setGeoLocation(addressData.latitude, addressData.longitude);
            }
          }
        );
      },
    }).open();
  };

  return (
    <div className="right-0 w-[60%] ">
      <div className="flex flex-row justify-end gap-4 mx-auto">
        <Button
          isActive={latitude && longitude ? false : true}
          name={
            latitude && longitude ? "다시 위치정보 받기" : "현재 위치정보 받기"
          }
          size="small"
          handleSetCurrent={handleCurrentLocationButtonClick}
        />
        <Button
          isActive={true}
          name="주소 검색하기"
          size="small"
          handleSetCurrent={openPostcodePopup}
        />
      </div>
    </div>
  );
}
