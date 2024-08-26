import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const KakaoAuth = () => {
  const navigate = useNavigate();
  const GRANT_TYPE = "authorization_code";
  const CODE = new URLSearchParams(window.location.search).get("code");
  useEffect(() => {
    axios
      .post(
        `https://kauth.kakao.com/oauth/token`,
        {
          grant_type: GRANT_TYPE,
          client_id: import.meta.env.VITE_KAKAO_REST_API_KEY,
          redirect_uri: import.meta.env.VITE_LOGIN_REDIRECT_URL,
          code: CODE,
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
          },
        }
      )
      .then((res) => {
        localStorage.setItem("token", res.data.access_token);
        navigate("/mypage");
      })
      .catch((error) => {
        console.log("error 발생", error);
      });
  }, [CODE, GRANT_TYPE, navigate]);

  return null;
};

export default KakaoAuth;
