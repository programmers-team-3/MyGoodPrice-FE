import { useState, Fragment } from 'react';
const dummyData = [
  {
    id: 1,
    shopName: '눈나무집',
    region: '서울특별시 종로구',
    address: '서울특별시 종로구 삼청로 136-1',
    tel: '02-739-6742',
    category: '한식',
    menu: [
      {
        id: 1,
        menu: '김치말이국수',
        price: 6500,
      },
      {
        id: 2,
        menu: '김치볶음밥',
        price: 6500,
      },
    ],
  },
  {
    id: 2,
    shopName: '대륙',
    region: '서울특별시 종로구',
    address: '서울특별시 종로구 종로 125 (종로3가) 1~2층',
    tel: '02-766-8411	',
    category: '중식',
    menu: [
      {
        id: 1,
        menu: '짜장면',
        price: 7000,
      },
      {
        id: 2,
        menu: '짬뽕',
        price: 8000,
      },
    ],
  },
  {
    id: 3,
    shopName: '먹고갈래지고갈래',
    region: '서울특별시 종로구',
    address: '서울특별시 종로구 수표로 117 (낙원동)',
    tel: '02-367-1239',
    category: '한식',
    menu: [
      {
        id: 1,
        menu: '삼계탕',
        price: 13000,
      },
      {
        id: 2,
        menu: '산채비빔밥',
        price: 7000,
      },
    ],
  },
  {
    id: 4,
    shopName: '눈나무집',
    region: '서울특별시 종로구',
    address: '서울특별시 종로구 삼청로 136-1',
    tel: '02-739-6742',
    category: '한식',
    menu: [
      {
        id: 1,
        menu: '김치말이국수',
        price: 6500,
      },
      {
        id: 2,
        menu: '김치볶음밥',
        price: 6500,
      },
    ],
  },
  {
    id: 5,
    shopName: '대륙',
    region: '서울특별시 종로구',
    address: '서울특별시 종로구 종로 125 (종로3가) 1~2층',
    tel: '02-766-8411	',
    category: '중식',
    menu: [
      {
        id: 1,
        menu: '짜장면',
        price: 7000,
      },
      {
        id: 2,
        menu: '짬뽕',
        price: 8000,
      },
    ],
  },
  {
    id: 6,
    shopName: '먹고갈래지고갈래',
    region: '서울특별시 종로구',
    address: '서울특별시 종로구 수표로 117 (낙원동)',
    tel: '02-367-1239',
    category: '한식',
    menu: [
      {
        id: 1,
        menu: '삼계탕',
        price: 13000,
      },
      {
        id: 2,
        menu: '산채비빔밥',
        price: 7000,
      },
    ],
  },
  {
    id: 7,
    shopName: '눈나무집',
    region: '서울특별시 종로구',
    address: '서울특별시 종로구 삼청로 136-1',
    tel: '02-739-6742',
    category: '한식',
    menu: [
      {
        id: 1,
        menu: '김치말이국수',
        price: 6500,
      },
      {
        id: 2,
        menu: '김치볶음밥',
        price: 6500,
      },
    ],
  },
  {
    id: 8,
    shopName: '대륙',
    region: '서울특별시 종로구',
    address: '서울특별시 종로구 종로 125 (종로3가) 1~2층',
    tel: '02-766-8411	',
    category: '중식',
    menu: [
      {
        id: 1,
        menu: '짜장면',
        price: 7000,
      },
      {
        id: 2,
        menu: '짬뽕',
        price: 8000,
      },
    ],
  },
  {
    id: 9,
    shopName: '대륙',
    region: '서울특별시 종로구',
    address: '서울특별시 종로구 종로 125 (종로3가) 1~2층',
    tel: '02-766-8411	',
    category: '중식',
    menu: [
      {
        id: 1,
        menu: '짜장면',
        price: 7000,
      },
      {
        id: 2,
        menu: '짬뽕',
        price: 8000,
      },
    ],
  },
  {
    id: 10,
    shopName: '대륙',
    region: '서울특별시 종로구',
    address: '서울특별시 종로구 종로 125 (종로3가) 1~2층',
    tel: '02-766-8411	',
    category: '중식',
    menu: [
      {
        id: 1,
        menu: '짜장면',
        price: 7000,
      },
      {
        id: 2,
        menu: '짬뽕',
        price: 8000,
      },
    ],
  },
  {
    id: 11,
    shopName: '대륙',
    region: '서울특별시 종로구',
    address: '서울특별시 종로구 종로 125 (종로3가) 1~2층',
    tel: '02-766-8411	',
    category: '중식',
    menu: [
      {
        id: 1,
        menu: '짜장면',
        price: 7000,
      },
      {
        id: 2,
        menu: '짬뽕',
        price: 8000,
      },
    ],
  },
  {
    id: 12,
    shopName: '대륙',
    region: '서울특별시 종로구',
    address: '서울특별시 종로구 종로 125 (종로3가) 1~2층',
    tel: '02-766-8411	',
    category: '중식',
    menu: [
      {
        id: 1,
        menu: '짜장면',
        price: 7000,
      },
      {
        id: 2,
        menu: '짬뽕',
        price: 8000,
      },
    ],
  },
  {
    id: 13,
    shopName: '대륙',
    region: '서울특별시 종로구',
    address: '서울특별시 종로구 종로 125 (종로3가) 1~2층',
    tel: '02-766-8411	',
    category: '중식',
    menu: [
      {
        id: 1,
        menu: '짜장면',
        price: 7000,
      },
      {
        id: 2,
        menu: '짬뽕',
        price: 8000,
      },
    ],
  },
  {
    id: 14,
    shopName: '대륙',
    region: '서울특별시 종로구',
    address: '서울특별시 종로구 종로 125 (종로3가) 1~2층',
    tel: '02-766-8411	',
    category: '중식',
    menu: [
      {
        id: 1,
        menu: '짜장면',
        price: 7000,
      },
      {
        id: 2,
        menu: '짬뽕',
        price: 8000,
      },
    ],
  },
  {
    id: 15,
    shopName: '대륙',
    region: '서울특별시 종로구',
    address: '서울특별시 종로구 종로 125 (종로3가) 1~2층',
    tel: '02-766-8411	',
    category: '중식',
    menu: [
      {
        id: 1,
        menu: '짜장면',
        price: 7000,
      },
      {
        id: 2,
        menu: '짬뽕',
        price: 8000,
      },
    ],
  },
  {
    id: 16,
    shopName: '대륙',
    region: '서울특별시 종로구',
    address: '서울특별시 종로구 종로 125 (종로3가) 1~2층',
    tel: '02-766-8411	',
    category: '중식',
    menu: [
      {
        id: 1,
        menu: '짜장면',
        price: 7000,
      },
      {
        id: 2,
        menu: '짬뽕',
        price: 8000,
      },
    ],
  },
  {
    id: 17,
    shopName: '대륙',
    region: '서울특별시 종로구',
    address: '서울특별시 종로구 종로 125 (종로3가) 1~2층',
    tel: '02-766-8411	',
    category: '중식',
    menu: [
      {
        id: 1,
        menu: '짜장면',
        price: 7000,
      },
      {
        id: 2,
        menu: '짬뽕',
        price: 8000,
      },
    ],
  },
  {
    id: 18,
    shopName: '대륙',
    region: '서울특별시 종로구',
    address: '서울특별시 종로구 종로 125 (종로3가) 1~2층',
    tel: '02-766-8411	',
    category: '중식',
    menu: [
      {
        id: 1,
        menu: '짜장면',
        price: 7000,
      },
      {
        id: 2,
        menu: '짬뽕',
        price: 8000,
      },
    ],
  },
  {
    id: 19,
    shopName: '대륙',
    region: '서울특별시 종로구',
    address: '서울특별시 종로구 종로 125 (종로3가) 1~2층',
    tel: '02-766-8411	',
    category: '중식',
    menu: [
      {
        id: 1,
        menu: '짜장면',
        price: 7000,
      },
      {
        id: 2,
        menu: '짬뽕',
        price: 8000,
      },
    ],
  },
];
export default function StoreOverview() {
  const [current, setCurrent] = useState<number | null>(null);

  const toggleCurrent = (id: number) => {
    setCurrent(id === current ? null : id);
  };

  const handleGoReview = (id: number) => {
    console.log(id);
    // navigate
  };

  return (
    <div className="overflow-y-scroll p-0">
      <div className="max-w-4xl mx-auto">
        <table className="min-w-full bg-white border border-subDarkColor">
          <thead>
            <tr className="text-mainColor bg-mainBrighterColor">
              <th className="py-2 px-4 border-b">Shop Name</th>
              <th className="py-2 px-4 border-b">Region</th>
              <th className="py-2 px-4 border-b">Category</th>
              <th className="py-2 px-4 border-b">Review</th>
            </tr>
          </thead>
          <tbody>
            {dummyData.map((shop) => (
              <Fragment key={shop.id}>
                <tr
                  className="cursor-pointer hover:bg-mainBrightColor"
                  onClick={() => toggleCurrent(shop.id)}
                >
                  <td className="py-2 px-4 border-b">{shop.shopName}</td>
                  <td className="py-2 px-4 border-b">{shop.region}</td>
                  <td className="py-2 px-4 border-b">{shop.category}</td>
                  <td
                    className="py-2 px-4 border-b"
                    onClick={() => handleGoReview(shop.id)}
                  >
                    go
                  </td>
                </tr>
                {current === shop.id && (
                  <tr>
                    <td
                      colSpan={4}
                      className="py-2 px-4 border-b bg-mainBrighterColor"
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
