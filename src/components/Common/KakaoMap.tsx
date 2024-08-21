import useGeoLocation from "@/store/useGeoLocation";
import { useEffect, useRef } from "react";
import { getCurrentLocation } from "@/utils/getCurLocation";
import { useNavigate } from "react-router-dom";

declare global {
  interface Window {
    kakao: any;
  }
}

const KakaoMap = () => {
  const mapRef = useRef<any>(null);

  const navigate = useNavigate();

  const { latitude, longitude, setGeoLocation } = useGeoLocation((state) => ({
    latitude: state.latitude,
    longitude: state.longitude,
    setGeoLocation: state.setGeoLocation,
  }));

  //위치정보 가지고 있는지
  useEffect(() => {
    const fetchLocation = async () => {
      if (!latitude || !longitude) {
        try {
          await getCurrentLocation(setGeoLocation); // 위치 정보 요청
        } catch (error) {
          alert("위치정보가 없으면 사용할 수 없는 서비스입니다. 동의해주세요!");
          navigate("/");
        }
      }
    };

    fetchLocation();
  }, [latitude, longitude, setGeoLocation]);

  useEffect(() => {
    const initMap = () => {
      const container = document.getElementById("map");
      if (!container) {
        console.error("지도 DOM이 없습니다.");
        return;
      }

      //기본 지도 설정
      const options = {
        center: new window.kakao.maps.LatLng(
          latitude || 33.450701,
          longitude || 126.570667
        ),
        level: 3,
      };
      mapRef.current = new window.kakao.maps.Map(container, options);

      // 위치 정보가 있을 경우에만 마커와 오버레이 추가
      if (latitude && longitude) {
        const currentPosition = new window.kakao.maps.LatLng(
          latitude,
          longitude
        );
        mapRef.current.setCenter(currentPosition);

        /// 애니메이션을 적용하기 위한 커스텀 엘리먼트
        const content = document.createElement("div");
        content.className = "relative flex items-center justify-center size-12";

        // 애니메이션 핑 추가
        const ping = document.createElement("div");
        ping.className =
          "absolute w-full h-full bg-indigo-400 rounded-full opacity-75 animate-ping";
        content.appendChild(ping);

        // 마커 본체
        const markerElement = document.createElement("div");
        markerElement.className = "relative bg-indigo-600 rounded-full size-3";
        content.appendChild(markerElement);

        // 마커 이미지 설정
        const markerSvg = document.createElement("img");
        markerSvg.src = "/my.svg"; // 마커 이미지 경로
        markerSvg.className = "absolute size-6";
        content.appendChild(markerSvg);

        // Custom Overlay 생성
        const customOverlay = new window.kakao.maps.CustomOverlay({
          position: currentPosition,
          content: content,
          yAnchor: 1, // 마커의 밑부분이 지도 위치에 고정되도록 설정
        });
        customOverlay.setMap(mapRef.current);
      }
    };

    if (window.kakao && window.kakao.maps) {
      initMap();
    } else {
      window.kakao.maps.load(initMap);
    }
  }, [latitude, longitude]);

  return <div id="map" style={{ width: "100%", height: "100%" }} />;
};

export default KakaoMap;
