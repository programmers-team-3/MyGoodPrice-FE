import { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";

import formatPrice from "@/utils/getUtil";
import { ShopTypes } from "@/types";
import useUserStore from "@/store/useUserStore";
import { Review } from "@/components/Review/Review";
import Loading from "@/components/Loading/LoadingBar";

import { PiCurrencyKrwFill } from "react-icons/pi";
import { BsTelephone } from "react-icons/bs";
import { BiCategoryAlt } from "react-icons/bi";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { FcLike, FcLikePlaceholder } from "react-icons/fc";
import useShopStore from "@/store/useShopStore";

export default function ShopPage() {
  const [searchParams] = useSearchParams();
  const [shopData, setShopData] = useState<ShopTypes>();

  const { loading, setLoading } = useUserStore();
  const { userInfo, setUserInfo } = useUserStore();
  const { toggleLikeShop } = useShopStore();

  useEffect(() => {
    const fetchShopData = async () => {
      const id = searchParams.get("id");
      if (id) {
        try {
          setLoading(true);
          const url = `${
            import.meta.env.VITE_PRODUCTION_API_BASE_URL
          }/stores/${id}`;
          const response = await axios.get(url);
          setShopData(response.data);
          setLoading(false);
        } catch (error) {
          console.log(error);
        }
      }
    };
    fetchShopData();
  }, [searchParams, setLoading]);

  const useLikes = (id: string) => {
    if (userInfo.likes.includes(id)) {
      setUserInfo({
        likes: userInfo.likes.filter((likeId) => likeId !== id),
      });
      toggleLikeShop(id, true);
    } else {
      setUserInfo({
        likes: [...userInfo.likes, id],
      });
      toggleLikeShop(id, false);
    }
  };

  if (loading) return <Loading text="가게 정보 불러오는 중.." />;

  return (
    <div className="top-0 w-full h-full overflow-y-auto">
      <div
        className={`flex flex-col items-start justify-between w-full px-5 pt-5 mx-auto mt-5 `}
        style={{
          height: `calc(40% + ${shopData?.menu?.length ? shopData.menu.length * 50 : 0}px)`,
        }}
      >
        <div className="flex items-center justify-between w-full">
          <h1 className="text-2xl font-bold">{shopData?.name}</h1>
          <div
            className="flex flex-col items-center"
            onClick={() => {
              if (shopData?.id) {
                useLikes(shopData.id);
              }
            }}
          >
            {shopData && userInfo.likes.includes(shopData.id) ? (
              <FcLike className="cursor-pointer" />
            ) : (
              <FcLikePlaceholder className="cursor-pointer" />
            )}
            <p>{shopData?.likes}</p>
          </div>
        </div>
        <span className="flex items-start">
          <HiOutlineLocationMarker className="mt-1 mr-1" />
          주소 : {shopData?.address}
        </span>
        <span className="flex items-start ">
          <BiCategoryAlt className="mt-1 mr-1" />
          카테고리 : {shopData?.category}
        </span>
        <span className="flex items-start ">
          <BsTelephone className="mt-1 mr-1" />
          전화번호 : {shopData?.tel}
        </span>
        <div className="w-full p-5 mx-auto -mt-5 text-xl ">
          {shopData?.menu.map((item, idx) => (
            <div className="flex items-center justify-between mt-1" key={idx}>
              <PiCurrencyKrwFill
                style={{
                  fill: "white",
                  stroke: "black",
                  strokeWidth: 5,
                  fontSize: "35px",
                }}
              />
              <div className="w-16 ml-2">품목</div>
              <div className="flex-1 mr-2 break-words">{item.menu}</div>
              <div className="ml-6 whitespace-nowrap">
                {formatPrice(item.price)}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="w-full mb-5">
        <Review />
      </div>
    </div>
  );
}
