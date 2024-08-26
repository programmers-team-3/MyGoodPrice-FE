import axios from "axios";
import { useNavigate } from "react-router-dom";
import { IoIosLogOut } from "react-icons/io";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { useEffect, useState } from "react";
import Button from "@/components/Button/Button";
import StoreOverview from "@/components/Overview/StoreOverview";
import LocationBox from "@/components/AddressBox/AddressBox";
import SaveAddress from "@/components/AddressBox/SaveAddress";
import useGeoLocation from "@/store/useGeoLocationStore";
import { CiCircleCheck } from "react-icons/ci";
import useUserStore from "@/store/useUserStore";
import useShopStore from "@/store/useShopStore";

const MyPage = () => {
  const navigate = useNavigate();
  const [address, setAddress] = useState<string>("");
  const [showList, setShowList] = useState(true);
  const { setMyShopData } = useShopStore();
  const { setUserInfo, userInfo } = useUserStore();

  const { latitude, longitude, setGeoLocation } = useGeoLocation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const TOKEN = localStorage.getItem("token");

        if (!TOKEN) {
          navigate("/login");
          return;
        }

        const tokenInfoUrl = "https://kapi.kakao.com/v1/user/access_token_info";
        await axios.get(tokenInfoUrl, {
          headers: {
            Authorization: `Bearer ${TOKEN}`,
          },
        });

        const userInfoUrl = "https://kapi.kakao.com/v2/user/me";
        const userInfoResponse = await axios.get(userInfoUrl, {
          headers: {
            Authorization: `Bearer ${TOKEN}`,
            "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
          },
        });

        setUserInfo({
          ...userInfo,
          id: userInfoResponse.data.id,
          name: userInfoResponse.data.properties.nickname,
        });

        const encodedLikes = encodeURIComponent(JSON.stringify(userInfo.likes));
        const likesUrl = `${
          import.meta.env.VITE_PRODUCTION_API_BASE_URL
        }/likes?storeId=${encodedLikes}`;
        const likesResponse = await axios.get(likesUrl);
        setMyShopData(likesResponse.data);
      } catch (error) {
        console.error(error);
        navigate("/login");
      }
    };

    fetchData();
  }, [navigate, userInfo.likes, setUserInfo]);

  const logout = async () => {
    const TOKEN = localStorage.getItem("token");
    const url = `https://kapi.kakao.com/v1/user/logout`;
    axios
      .post(
        url,
        {},
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
            Authorization: `Bearer ${TOKEN}`,
          },
        }
      )
      .then(() => {
        localStorage.removeItem("token");
        navigate("/login");
      })
      .catch((error) => {
        console.error("카카오 로그아웃 실패", error);
      });
  };

  const moveAnalyze = () => {
    navigate("/mypage/analyze");
  };

  const deleteAddress = () => {
    setAddress("");
    setGeoLocation(null, null);
  };

  return (
    <div
      className={`h-full w-full flex flex-col py-4 m-4
    min-w-minPage gap-6 transition duration-300 
    overflow-y-scroll self-center
    justify-start`}
    >
      <div className="relative flex items-end gap-1 font-bold">
        <span className="text-2xl text-mainDarkColor">{userInfo.name}</span>
        <span className="text-lg"> 님의 페이지</span>
        <IoIosLogOut
          className="absolute top-0 right-0 w-8 h-8 cursor-pointer text-subColor"
          onClick={logout}
        />
      </div>
      <div className="flex flex-col gap-4">
        <div className="relative flex flex-row items-center justify-between py-2 border-b-2">
          <p className="text-xl font-bold  text-mainColor w-[25%]">위치 저장</p>
          <LocationBox handleAddress={(address) => setAddress(address)} />
        </div>
        {address ? (
          <SaveAddress address={address} handleDeleteAddress={deleteAddress} />
        ) : latitude && longitude ? (
          <div className="flex items-center ">
            <CiCircleCheck className="mr-1" />
            <p>위치 등록 완료!</p>
          </div>
        ) : (
          <p>등록된 주소가 없습니다.</p>
        )}
      </div>
      <div className="flex flex-col gap-4">
        <div className="relative border-b-2">
          <p className="text-xl font-bold text-mainColor">
            내가 찜한 가게 리스트
          </p>
          {showList ? (
            <AiOutlineMinus
              className="absolute w-6 h-6 -translate-y-1/2 cursor-pointer top-1/2 right-2"
              onClick={() => setShowList(false)}
            />
          ) : (
            <AiOutlinePlus
              className="absolute w-6 h-6 -translate-y-1/2 cursor-pointer top-1/2 right-2"
              onClick={() => setShowList(true)}
            />
          )}
        </div>
        {showList ? <StoreOverview pageType="my" /> : null}
      </div>

      <Button
        isActive={true}
        size="large"
        name="내가 찜한 가게 분석하기"
        handleSetCurrent={moveAnalyze}
      />
    </div>
  );
};

export default MyPage;
