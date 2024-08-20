import { useState } from "react";
import KakaoLogin from "@/assets/imgs/Kakaologin.png";
import { LiaEyeSolid, LiaEyeSlashSolid } from "react-icons/lia";

export default function LoginBox() {
  const [values, setValues] = useState(["", ""]);
  const [show, setShow] = useState(false);

  const handleChange = (idx: number, value: string) => {
    const updatedValues = [...values];
    updatedValues[idx] = value;
    setValues(updatedValues);
  };
  const url = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${
    import.meta.env.VITE_KAKAO_REST_API_KEY
  }&redirect_uri=${import.meta.env.VITE_LOGIN_REDIRECT_URL}`;
  const handleLogin = () => {
    window.location.href = url;
  };
  return (
    <div className="flex flex-col gap-4">
      <div>
        <input
          className="appearance-none border rounded w-full p-2"
          value={values[0]}
          type="email"
          placeholder="아이디"
          onChange={(e) => handleChange(0, e.target.value)}
        />
      </div>
      <div className="relative">
        <input
          className="appearance-none border rounded w-full p-2"
          value={values[1]}
          type={show ? "text" : "password"}
          placeholder="비밀번호"
          onChange={(e) => handleChange(1, e.target.value)}
        />
        {show ? (
          <LiaEyeSolid
            className="absolute top-1/2 right-4 -translate-y-1/2
           w-5 h-5 text-subDarkColor cursor-pointer"
            onClick={() => setShow(false)}
          />
        ) : (
          <LiaEyeSlashSolid
            className="absolute top-1/2 right-4 -translate-y-1/2
         w-5 h-5 text-subDarkColor cursor-pointer"
            onClick={() => setShow(true)}
          />
        )}
      </div>
      <div
        className="w-full h-16 flex justify-center items-center border rounded rounded-lg
          p-2 bg-mainColor text-mainBrighterColor font-bold cursor-pointer"
      >
        <p className="text-xl">로그인</p>
      </div>
      <img
        src={KakaoLogin}
        alt="kakaoLogin"
        className="w-full h-16 cursor-pointer"
        onClick={handleLogin}
      />
      <p className="text-center underline text-subDarkColor cursor-pointer">
        회원가입
      </p>
    </div>
  );
}
