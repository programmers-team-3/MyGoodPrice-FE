import KakaoMap from "@/components/Common/KakaoMap";
import styled from "styled-components";

const MapPage = () => {
  return (
    <MapPageStyle>
      <KakaoMap />
    </MapPageStyle>
  );
};

const MapPageStyle = styled.div`
  width: 50vw;
  height: 100%;
  margin: 0 auto;

  @media (max-width: 768px) {
    width: 100%; // 모바일 뷰 너비를 100%
  }
`;

export default MapPage;
