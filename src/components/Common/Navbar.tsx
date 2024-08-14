import { theme } from "@/styles/theme";
import { AiOutlineHome } from "react-icons/ai";
import { IoPersonOutline } from "react-icons/io5";
import { PiMapPinAreaBold } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <NavbarStyle>
      <PiMapPinAreaBold
        className="h-[7vh] w-auto cursor-pointer"
        style={{ color: theme.mainColor }}
        onClick={() => navigate("/map")}
      />
      <AiOutlineHome
        className="h-[7vh] w-auto cursor-pointer"
        style={{ color: theme.mainColor }}
        onClick={() => navigate("/")}
      />
      <IoPersonOutline
        className="h-[7vh] w-auto cursor-pointer"
        style={{ color: theme.mainColor }}
        onClick={() => navigate("/mypage")}
      />
    </NavbarStyle>
  );
};

const NavbarStyle = styled.div`
  box-shadow: 0 -4px 8px rgba(0, 0, 0, 0.1);

  display: flex;
  align-items: center;
  justify-content: space-around;

  height: 10vh;
  width: 100%;
`;

export default Navbar;
