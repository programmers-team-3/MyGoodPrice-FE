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
    width: 100%;
  }
`;
const StyledHeader = styled(Header)`
  position: absolute;
  top: 0;
  width: 100%;
`;

const Content = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  padding: 0;
  width: 100%;
`;

const StyledNavbar = styled(Navbar)`
  position: absolute;
  bottom: 0;
  width: 100%;
`;

export default Layout;
