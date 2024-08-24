import { ShopTypes } from "@/types";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import useUserStore from "@/store/useUserStore";
import Loading from "@/components/Loading/LoadingBar";
  import { PiCurrencyKrwBold } from "react-icons/pi";

export default function ShopPage() {
  const [searchParams] = useSearchParams();
  const [shopData, setShopData] = useState<ShopTypes | null>(null);
  const { loading, setLoading } = useUserStore();

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
          console.log(response);
          setShopData(response.data);
          setLoading(false);
        } catch (error) {
          console.log(error);
        }
      }
    };
    fetchShopData();
  }, [searchParams, setLoading]);

  if (loading) return <Loading text="가게 정보 불러오는 중.." />;

  return (
     <div className="w-full h-full text-xl border-2">
      <div className="w-[60%] h-[50%] mt-5 border-2 mx-auto flex items-center justify-center">
      <div>{shopData ? <div>{shopData.name}</div> : <p>데이터 없음</p>}</div>
        <h1>name</h1>
        <span>address</span>
        <span>category</span>
        <span>tel</span>
      </div>
      <div className="w-[60%]  mx-auto mt-5 flex flex-col">
        <div className="flex items-center justify-start">
          <PiCurrencyKrwBold />
          <div className="w-24 border-2">대표메뉴</div>
          <div className="border-2">김치찌개</div>
          <div className="w-[30%] border-2">3000 원</div>
          {/* formatPrice */}
        </div>
        <div className="flex items-center justify-start">
          <PiCurrencyKrwBold />
          <div className="w-24 border-2">대표메뉴</div>
          <div className="border-2">김치찌개</div>
          <div className="w-[30%] border-2">3000 원</div>
          {/* formatPrice */}
        </div>
      </div>
    </div>
  );
}
