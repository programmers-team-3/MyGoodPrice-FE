import { useState, Fragment, MouseEvent } from "react";
import { FcLike, FcLikePlaceholder } from "react-icons/fc";
import { PiCaretUpDownLight } from "react-icons/pi";
import { MdKeyboardDoubleArrowDown } from "react-icons/md";
import useShopStore from "@/store/useShopStore";
import useUserStore from "@/store/useUserStore";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ShopTypes, AttributeType } from "@/types";
import { filterSearchCriteria } from "@/utils/filterSearchCriteria";

type StoreOverviewProps = {
  attributes?: AttributeType[];
  currentCategory?: string;
};

export default function StoreOverview({
  attributes = [
    { id: 1, name: "가게 이름", isSorting: "lexical" },
    { id: 2, name: "위치", isSorting: "location" },
    { id: 3, name: "카테고리", isSorting: null },
    { id: 4, name: "찜", isSorting: "likes" },
  ],
  currentCategory = "전체",
}: StoreOverviewProps) {
  const {
    currentFilter,
    currentShopData,
    toggleLikeShop,
    sortData,
    setFilter,
    setCurrentShopData,
  } = useShopStore();
  const { userInfo, setUserInfo } = useUserStore();
  const [current, setCurrent] = useState<string | null>(null);
  const { setLoading } = useUserStore();
  const navigate = useNavigate();

  const toggleLikes = (e: MouseEvent, id: string) => {
    e.stopPropagation();
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

    // [API]('/likes')
  };

  // [API] ('/shop') : 페이지네이션
  const handleSearchAddShop = async () => {
    const nextPage = currentFilter.page ? currentFilter.page + 1 : 1;
    const { searchMinPrice, searchMaxPrice, searchLocation, searchCategory } =
      filterSearchCriteria(currentFilter);

    const url = `${
      import.meta.env.VITE_PRODUCTION_API_BASE_URL
    }/stores?page=${nextPage}&limit=${
      currentFilter.limit
    }&category=${searchCategory}&maxPrice=${searchMaxPrice}&minPrice=${searchMinPrice}&location=${searchLocation}&search=${
      currentFilter.input
    }`;

    try {
      setLoading(true);
      const res = await axios.get(url);
      console.log(res);
      setFilter({
        ...currentFilter,
        page: nextPage,
        isEnd: res.data.length !== currentFilter.limit,
      });
      setCurrentShopData([...(currentShopData as ShopTypes[]), ...res.data]);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="overflow-y-scroll p-0 flex flex-col items-center">
      {currentShopData === null ? (
        <p className="font-bold text-mainDarkColor">
          필터 혹은 검색하여 원하는 가게를 찾아보세요.
        </p>
      ) : currentShopData.length === 0 ? (
        <p className="font-bold text-mainDarkColor">
          필터링 된 가게가 존재하지 않습니다.
        </p>
      ) : (
        <>
          <table
            className="max-w-4xl mx-auto min-w-full
    bg-white border border-subDarkColor"
          >
            <thead>
              <tr className="text-mainColor bg-mainBrighterColor w-full">
                {attributes.map((attribute) => (
                  <th
                    key={attribute.id}
                    className={`py-1 border-b ${
                      attribute.name.length >= 2
                        ? "relative w-[15vw]"
                        : "w-[5vw]"
                    }`}
                  >
                    {attribute.isSorting !== null ? (
                      <div
                        className="flex justify-center items-center cursor-pointer hover:underline underline-offset-2"
                        onClick={() => sortData(attribute.isSorting)}
                      >
                        <p>{attribute.name}</p>
                        <PiCaretUpDownLight className="w-4 h-4" />
                      </div>
                    ) : (
                      <p className="whitespace-nowrap">{attribute.name}</p>
                    )}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {currentShopData?.filter(
                (shop) =>
                  currentCategory === "전체" ||
                  currentCategory === shop.category
              ).length === 0 ? (
                <tr>
                  <td
                    colSpan={4}
                    className="py-4 text-center text-mainDarkColor font-bold"
                  >
                    카테고리에 속한 가게가 없습니다.
                  </td>
                </tr>
              ) : (
                currentShopData?.map((shop) => {
                  if (
                    currentCategory === "전체" ||
                    currentCategory === shop.category
                  ) {
                    return (
                      <Fragment key={shop.id}>
                        <tr
                          className="cursor-pointer hover:bg-mainBrightColor"
                          onClick={() =>
                            setCurrent(shop.id === current ? null : shop.id)
                          }
                        >
                          <td className="py-2 px-1 border-b text-center">
                            {shop.name}
                          </td>
                          <td className="py-2 px-1 border-b text-center">
                            {shop.state} {shop.city}
                          </td>
                          <td className="py-2 px-1 border-b whitespace-nowrap text-center">
                            {shop.category}
                          </td>
                          <td
                            className="border-b"
                            onClick={(e) => toggleLikes(e, shop.id)}
                          >
                            <span className="flex justify-center items-center gap-1">
                              {userInfo.likes.includes(shop.id) ? (
                                <FcLike />
                              ) : (
                                <FcLikePlaceholder />
                              )}
                              <p>{shop.likes}</p>
                            </span>
                          </td>
                        </tr>
                        {current === shop.id && (
                          <tr>
                            <td
                              colSpan={4}
                              className="py-2 px-4 border-b bg-mainBrighterColor"
                              onClick={() => navigate(`/shop?id=${shop.id}`)}
                            >
                              <p>Address: {shop.address}</p>
                              <p>Tel: {shop.tel}</p>
                              <p>Menu:</p>
                              <ul className="list-disc pl-5">
                                {shop.menu.map((item) => (
                                  <li key={item.id}>
                                    {item.menu} - {item.price}원
                                  </li>
                                ))}
                              </ul>
                            </td>
                          </tr>
                        )}
                      </Fragment>
                    );
                  }
                  return null;
                })
              )}
            </tbody>
          </table>
          <div>
            {!currentFilter.isEnd && (
              <MdKeyboardDoubleArrowDown
                className="w-10 h-10 text-subColor cursor-pointer mt-2"
                onClick={handleSearchAddShop}
              />
            )}
          </div>
        </>
      )}
    </div>
  );
}
