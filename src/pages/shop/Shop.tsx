import { PiCurrencyKrwBold } from "react-icons/pi";

export default function ShopPage() {
  return (
    <div className="w-full h-full text-xl border-2">
      <div className="w-[60%] h-[50%] mt-5 border-2 mx-auto flex items-center justify-center">
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
