import KakaoMap from "@/components/Common/KakaoMap";
import styled from "styled-components";
import { DumyDataLatLng } from "@/components/Common/DataLatLng";
import { useRef } from "react";
// import { useNavigate } from "react-router-dom";

const MapPage = () => {
  // const navigate = useNavigate();
  const scrollRef = useRef<HTMLDivElement | null>(null);
  let isDragging = false;
  let startX: number = 0;
  let scrollLeft: number = 0;

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
          <button className="w-20 bg-subColor h-[60%] rounded-2xl flex justify-center items-center shadow-xl font-bold">
            1km
          </button>
          <button className="w-20 bg-subColor h-[60%] rounded-2xl flex justify-center items-center shadow-xl font-bold">
            3km
          </button>
          <button className="w-20 bg-subColor h-[60%] rounded-2xl flex justify-center items-center shadow-xl font-bold">
            5km
          </button>
        </div>
      </ButtonModal>
      <SlideModal>
        <div
          className="absolute bottom-0 w-full h-full pb-1 overflow-x-scroll whitespace-nowrap cursor-grab "
          ref={scrollRef}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
        >
          {DumyDataLatLng.map((val, idx) => (
            <div
              key={idx}
              className="inline-block w-48 h-full p-3 mx-2 text-sm font-bold border-2 rounded-lg shadow-xl bg-subColor text-mainDarkColor"
              // onClick={() => navigate("/shop?shop_id=3")}
            >
              <p className="select-none">{val.name}</p>
              <p className="select-none">{val.address}</p>
            </div>
          ))}
        </div>
      </SlideModal>

      <KakaoMap markers={DumyDataLatLng} />
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

  z-index: 1000; // z-index 설정 (카카오맵 위에 표시)
`;

export default MapPage;
