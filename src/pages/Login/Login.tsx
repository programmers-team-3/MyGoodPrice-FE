import styled from "styled-components";
import KakaoLogin from "@/assets/imgs/Kakaologin.png";

const Login = () => {
  return (
    <LoginStyle>
      <img src={KakaoLogin} alt="kakaoLogin" className="w-[60%] mx-auto" />
    </LoginStyle>
  );
};

const LoginStyle = styled.div``;

export default Login;
