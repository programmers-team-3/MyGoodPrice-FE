import { ShopTypes } from "@/types";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import useUserStore from "@/store/useUserStore";
import Loading from "@/components/Loading/LoadingBar";

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
    <div>{shopData ? <div>{shopData.name}</div> : <p>데이터 없음</p>}</div>
  );
}
