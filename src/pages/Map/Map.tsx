import KakaoMap from "@/components/Common/KakaoMap";
import styled from "styled-components";
import { useEffect, useRef, useState } from "react";
import { getCurrentLocation } from "@/utils/getCurLocation";
import { useNavigate } from "react-router-dom";
import useGeoLocation from "@/store/useGeoLocationStore";
import { fetchDistanceData } from "@/apis/distance.api";
import { ShopWithLocation } from "@/types";
import formatPrice from "@/utils/getUtil";

const MapPage = () => {
  const navigate = useNavigate();

  const scrollRef = useRef<HTMLDivElement | null>(null);
  let isDragging = false;
  let startX: number = 0;
  let scrollLeft: number = 0;

  const [disId, setDisId] = useState<number>(1);
  const [shopData, setShopData] = useState<ShopWithLocation[]>([]);

  const { latitude, longitude, setGeoLocation } = useGeoLocation((state) => ({
    latitude: state.latitude,
    longitude: state.longitude,
    setGeoLocation: state.setGeoLocation,
  }));

  // 위치 정보 가져오기
  const fetchLocation = async () => {
    try {
      await getCurrentLocation(setGeoLocation);
    } catch (error) {
      alert("위치정보가 없으면 사용할 수 없는 서비스입니다. 동의해주세요!");
      navigate("/");
    }
  };

  // 거리 데이터 가져오기
  const fetchShopData = async () => {
    if (latitude && longitude) {
      const data = await fetchDistanceData(longitude, latitude, disId);
      setShopData(data);
      // console.log(shopData);
    }
  };

  useEffect(() => {
    if (!latitude || !longitude) {
      fetchLocation();
    } else {
      fetchShopData();
    }
  }, [latitude, longitude, disId]);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (scrollRef.current) {
      isDragging = true;
      startX = e.pageX - scrollRef.current.offsetLeft;
      scrollLeft = scrollRef.current.scrollLeft;
    }
  };

  const handleMouseLeave = () => {
    isDragging = false;
  };

  const handleMouseUp = () => {
    isDragging = false;
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 0.5; // 스크롤 속도 조정
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <MapPageStyle>
      <ButtonModal>
        <div className="flex items-center justify-center w-full h-full gap-2">
          <button
            className={`w-20 h-[60%] rounded-2xl flex justify-center items-center shadow-xl font-bold
              ${disId === 1 ? "bg-gray-600 text-mainBrightColor" : "bg-mainBrighterColor"}`}
            onClick={() => setDisId(1)}
          >
            1km
          </button>
          <button
            className={`w-20 h-[60%] rounded-2xl flex justify-center items-center shadow-xl font-bold
              ${disId === 3 ? "bg-gray-600 text-mainBrightColor" : "bg-mainBrighterColor"}`}
            onClick={() => setDisId(3)}
          >
            3km
          </button>
          <button
            className={`w-20 h-[60%] rounded-2xl flex justify-center items-center shadow-xl font-bold
              ${disId === 5 ? "bg-gray-600 text-mainBrightColor" : "bg-mainBrighterColor"}`}
            onClick={() => setDisId(5)}
          >
            5km
          </button>
        </div>
      </ButtonModal>
      <SlideModal>
        <div
          className="absolute bottom-0 w-full h-full pb-1 overflow-x-scroll overflow-y-hidden whitespace-nowrap cursor-grab"
          ref={scrollRef}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
        >
          {shopData.map((val, idx) => {
            return (
              val.menu.length !== 0 && (
                <div
                  key={idx}
                  className="inline-block w-48 min-h-full p-3 mx-2 text-sm font-bold text-gray-600 rounded-lg shadow-2xl bg-mainBrightColor"
                  onClick={() => navigate(`/shop?id=${val.id}`)}
                >
                  <p className="overflow-hidden text-base select-none text-mainDarkColor whitespace-nowrap text-ellipsis">
                    {val.name}
                  </p>
                  <p className="overflow-hidden select-none whitespace-nowrap text-ellipsis">
                    {val.address.split(" ").slice(1).join(" ")}
                  </p>
                  <div className="flex justify-between w-full">
                    <p className="w-1/4 select-none">{val.category} -</p>
                    <div className="flex items-center justify-end w-3/4">
                      <p className="mr-1 overflow-hidden select-none whitespace-nowrap text-ellipsis">
                        {val.menu[0].menu}
                      </p>
                      <p className="w-16 select-none">
                        {formatPrice(val.menu[0].price)}
                      </p>
                    </div>
                  </div>
                  <p className="select-none">{val.tel ? val.tel : "..."}</p>
                </div>
              )
            );
          })}
        </div>
      </SlideModal>

      {latitude && longitude && (
        <KakaoMap
          markers={shopData}
          latitude={latitude}
          longitude={longitude}
        />
      )}
    </MapPageStyle>
  );
};

const MapPageStyle = styled.div`
  width: 50vw;
  height: 100%;
  margin: 0 auto;
  position: relative;

  @media (max-width: 768px) {
    width: 100%; // 모바일 뷰 너비를 100%
  }
`;

const ButtonModal = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
  height: 10%;

  z-index: 1000; // z-index 설정 (카카오맵 위에 표시)
`;

const SlideModal = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 7rem;
  overflow: hidden;

  z-index: 1000; // z-index 설정 (카카오맵 위에 표시)
`;

export default MapPage;
