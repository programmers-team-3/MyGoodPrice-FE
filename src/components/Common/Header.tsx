import styled from "styled-components";
import Logo from "@/assets/imgs/LogoBlue.svg?react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  return (
    <HeaderStyle>
      <Logo className="cursor-pointer" onClick={() => navigate("/")} />
    </HeaderStyle>
  );
};

const HeaderStyle = styled.div`
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);

  display: flex;
  align-items: center;
  justify-content: center;

  height: 8vh;
  width: 100%;
`;

export default Header;
