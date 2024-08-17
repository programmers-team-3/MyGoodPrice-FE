import { Outlet } from "react-router-dom";
import styled from "styled-components";

import Navbar from "../Common/Navbar";
import Header from "../Common/Header";

const Layout = () => {
  return (
    <LayoutStyle>
      <StyledHeader />
      <Content>
        <Outlet />
      </Content>
      <StyledNavbar />
    </LayoutStyle>
  );
};

const LayoutStyle = styled.div`
  background: #fff;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0 auto;

  width: 50vw;
  min-width: 320px;
  height: 100vh;
  position: relative;

  @media (max-width: 768px) {
    // 화면 너비가 768px 이하일 경우
    width: 100%; // 모바일 뷰에서는 너비를 100%로 설정
  }
`;
const StyledHeader = styled(Header)`
  position: absolute; // 절대 위치 설정
  top: 0; // 상단 고정
  width: 100%; // 너비를 100%로 설정
`;

const Content = styled.div`
  flex: 1; // 남은 공간을 차지하도록 설정
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  overflow: hidden;
  padding: 0;
`;

const StyledNavbar = styled(Navbar)`
  position: absolute;
  bottom: 0;
  width: 100%;
`;

export default Layout;
