import useGeoLocation from "@/store/useGeoLocation";
import { useEffect, useRef, useState } from "react";
import { getCurrentLocation } from "@/utils/getCurLocation";
import { useNavigate } from "react-router-dom";

declare global {
  interface Window {
    kakao: any;
  }
}

interface MarkerData {
  id: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
}

const KakaoMap = ({ markers }: { markers: MarkerData[] }) => {
  const mapRef = useRef<any>(null);
  const navigate = useNavigate();
  const [selectedMarkerId, setSelectedMarkerId] = useState<string | null>(null);

  const clickImage = "/activePin.svg";
  const defaultImage = "/pin.svg";

  const { latitude, longitude, setGeoLocation } = useGeoLocation((state) => ({
    latitude: state.latitude,
    longitude: state.longitude,
    setGeoLocation: state.setGeoLocation,
  }));

  // 위치 정보 가져오기
  const fetchLocation = async () => {
    if (!latitude || !longitude) {
      try {
        await getCurrentLocation(setGeoLocation);
      } catch (error) {
        alert("위치정보가 없으면 사용할 수 없는 서비스입니다. 동의해주세요!");
        navigate("/");
      }
    }
  };
  useEffect(() => {
    fetchLocation();
  }, [latitude, longitude, setGeoLocation]);

  // 지도 초기화
  const initMap = () => {
    const container = document.getElementById("map");
    if (!container) {
      console.error("지도 DOM이 없습니다.");
      return;
    }
    const options = {
      center: new window.kakao.maps.LatLng(
        latitude || 33.450701,
        longitude || 126.570667
      ),
      level: 4,
    };
    mapRef.current = new window.kakao.maps.Map(container, options);

    if (latitude && longitude) {
      const currentPosition = new window.kakao.maps.LatLng(latitude, longitude);
      addMarker(currentPosition);
      mapRef.current.setCenter(currentPosition);
    }
    addMarkerData();
  };

  // 현위치 마커 추가
  const addMarker = (position: any) => {
    const content = createMarkernow();

    const customOverlay = new window.kakao.maps.CustomOverlay({
      position: position,
      content: content,
      yAnchor: 1,
    });
    customOverlay.setMap(mapRef.current);
  };

  // 현위치 마커 생성
  const createMarkernow = () => {
    const content = document.createElement("div");
    content.className = "relative flex items-center justify-center size-12";

    const ping = document.createElement("div");
    ping.className =
      "absolute w-full h-full bg-indigo-400 rounded-full opacity-75 animate-ping";
    content.appendChild(ping);

    const markerElement = document.createElement("div");
    markerElement.className = "relative bg-indigo-600 rounded-full size-3";
    content.appendChild(markerElement);

    const markerSvg = document.createElement("img");
    markerSvg.src = "/my.svg"; // 마커 이미지 경로
    markerSvg.className = "absolute size-6";
    content.appendChild(markerSvg);

    return content;
  };

  // 데이터 마커 추가
  const addMarkerData = () => {
    markers.forEach((marker) => {
      const position = new window.kakao.maps.LatLng(
        marker.latitude,
        marker.longitude
      );

      const markerImage = new window.kakao.maps.MarkerImage(
        defaultImage,
        new window.kakao.maps.Size(24, 35)
      );
      const dataMarker = new window.kakao.maps.Marker({
        position: position,
        image: markerImage,
        clickable: true,
        zIndex: 3000,
      });
      dataMarker.setMap(mapRef.current);

      // 마커 클릭 이벤트 설정
      window.kakao.maps.event.addListener(dataMarker, "click", () => {
        console.log(marker); //9
        console.log("selectedMarkerId : ", selectedMarkerId); //null

        if (selectedMarkerId !== marker.id) {
          const prevMarkerId = marker.id;
          setSelectedMarkerId(marker.id);
          console.log("pvev, markerId : ", prevMarkerId, marker.id); // null 9

          if (prevMarkerId) {
            //selectedMarkerId is null > if 문 실행 안됨
            console.log("prevMarkerId : ", prevMarkerId); //출력안됨
            const prevMarker = markers.find((m) => m.id === prevMarkerId);
            if (prevMarker) {
              const prevPosition = new window.kakao.maps.LatLng(
                prevMarker.latitude,
                prevMarker.longitude
              );
              const prevMarkerInstance = new window.kakao.maps.Marker({
                position: prevPosition,
                image: new window.kakao.maps.MarkerImage(
                  defaultImage,
                  new window.kakao.maps.Size(24, 35)
                ),
              });
              prevMarkerInstance.setMap(mapRef.current);
            }
          }

          // 현재 클릭된 마커의 이미지는 클릭 이미지로 변경합니다
          dataMarker.setImage(
            new window.kakao.maps.MarkerImage(
              clickImage,
              new window.kakao.maps.Size(24, 35)
            )
          );
        }
      });
    });
  };

  useEffect(() => {
    if (window.kakao && window.kakao.maps) {
      initMap();
    } else {
      window.kakao.maps.load(() => {
        initMap();
      });
    }
  }, [latitude, longitude, markers]);

  return <div id="map" style={{ width: "100%", height: "100%" }} />;
};

export default KakaoMap;
