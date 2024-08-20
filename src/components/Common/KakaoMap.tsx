import { useEffect, useRef } from "react";

declare global {
  interface Window {
    kakao: any;
  }
}

const KakaoMap = () => {
  const mapRef = useRef<any>(null);
  const overlayRef = useRef<any>(null);

  useEffect(() => {
    const initMap = () => {
      const container = document.getElementById("map");
      if (!container) {
        console.error("지도 DOM이 없습니다.");
        return;
      }

      //기본 지도 설정
      const options = {
        center: new window.kakao.maps.LatLng(33.450701, 126.570667),
        level: 3,
      };
      mapRef.current = new window.kakao.maps.Map(container, options);

      // Geolocation API 현재 위치
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;

            // 현재 위치를 중심으로 지도 이동
            const currentPosition = new window.kakao.maps.LatLng(
              latitude,
              longitude
            );
            mapRef.current.setCenter(currentPosition);

            // 마커 생성
            const marker = new window.kakao.maps.Marker({
              position: currentPosition,
            });
            marker.setMap(mapRef.current);

            // Custom Overlay 생성
            const customOverlayContent = `
              <div class="bg-mainBrightColor text-mainColor border-2 border-mainColor h-8 rounded-xl p-1 mx-auto flex items-center justify-center">
                현재 위치
              </div>
            `;

            overlayRef.current = new window.kakao.maps.CustomOverlay({
              position: currentPosition,
              content: customOverlayContent,
              yAnchor: -0.5,
            });
            overlayRef.current.setMap(mapRef.current);
          },

          (error) => {
            console.error("위치정보를 가져오는 데 실패했습니다.", error);
          }
        );
      } else {
        console.error("이 브라우저는 Geolocation을 지원하지 않습니다.");
      }
    };

    if (window.kakao && window.kakao.maps) {
      initMap();
    } else {
      window.kakao.maps.load(initMap);
    }
  }, []);

  return <div id="map" style={{ width: "100%", height: "100%" }} />;
};

export default KakaoMap;
