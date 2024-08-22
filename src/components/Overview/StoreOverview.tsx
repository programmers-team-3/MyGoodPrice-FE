import { useState, Fragment } from "react";
import { ShopTypes } from "@/types";
import { FcLike, FcLikePlaceholder } from "react-icons/fc";
import { PiCaretUpDownLight } from "react-icons/pi";
import { dummyShopData, dummyUserLikeData } from "@/store/data";

type AttributeType = {
  id: number;
  name: string;
  isSorting: boolean;
};

type StoreOverviewProps = {
  tableSize?: number;
  data?: ShopTypes[];
  attributes?: AttributeType[];
};
export default function StoreOverview({
  tableSize = 4,
  data = dummyShopData,
  attributes = [
    { id: 1, name: "가게 이름", isSorting: false },
    { id: 2, name: "위치", isSorting: false },
    { id: 3, name: "카테고리", isSorting: false },
    { id: 4, name: "찜", isSorting: true },
  ],
}: StoreOverviewProps) {
  const [current, setCurrent] = useState<number | null>(null);

  const toggleCurrent = (id: number) => {
    setCurrent(id === current ? null : id);

    // handle filtering category api 필요
  };

  const toggleLikes = (id: number) => {
    if (dummyUserLikeData.includes(id)) return;
    else return;
    // /likes api 작성
  };

  const handleLikeSorting = () => {
    // data Sorting => like
    console.log("sorting");
  };

  const handleMoveShop = (id: number) => {
    // navigate
    console.log(id);
  };

  return (
    <div className="overflow-y-scroll p-0">
      <div className="max-w-4xl mx-auto">
        <table className="min-w-full bg-white border border-subDarkColor">
          <thead>
            <tr className="text-mainColor bg-mainBrighterColor">
              {attributes.map((attribute) => (
                <th key={attribute.id} className="py-2 border-b relative">
                  <div className="flex justify-center items-center">
                    <p>{attribute.name}</p>
                    {attribute.isSorting && (
                      <PiCaretUpDownLight
                        className="w-4 h-4"
                        onClick={handleLikeSorting}
                      />
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((shop) => (
              <Fragment key={shop.id}>
                <tr
                  className="cursor-pointer hover:bg-mainBrightColor"
                  onClick={() => toggleCurrent(shop.id)}
                >
                  <td className="py-2 px-4 border-b">{shop.shopName}</td>
                  <td className="py-2 px-4 border-b">{shop.region}</td>
                  <td className="py-2 px-4 border-b whitespace-nowrap">
                    {shop.category}
                  </td>
                  <td
                    className="py-2 px-4 border-b"
                    onClick={() => toggleLikes(shop.id)}
                  >
                    <span className="flex justify-center items-center gap-2">
                      {dummyUserLikeData.includes(shop.id) ? (
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
                      colSpan={tableSize}
                      className="py-2 px-4 border-b bg-mainBrighterColor"
                      onClick={() => handleMoveShop(shop.id)}
                    >
                      <div>
                        <p>
                          <strong>Address:</strong> {shop.address}
                        </p>
                        <p>
                          <strong>Tel:</strong> {shop.tel}
                        </p>
                        <p>
                          <strong>Menu:</strong>
                        </p>
                        <ul className="list-disc pl-5">
                          {shop.menu.map((item) => (
                            <li key={item.id}>
                              {item.menu} - {item.price}원
                            </li>
                          ))}
                        </ul>
                      </div>
                    </td>
                  </tr>
                )}
              </Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
