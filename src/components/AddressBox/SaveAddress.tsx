import { AddressTypes } from "@/types";
import { MdLocationOn, MdOutlineLocationOn } from "react-icons/md";

type SaveAddressProps = {
  addresses: AddressTypes[];
  handleDeleteAddress: (address: AddressTypes) => void;
  handleMainChangeAddress: (address: AddressTypes) => void;
};
export default function SaveAddress({
  addresses,
  handleDeleteAddress,
  handleMainChangeAddress,
}: SaveAddressProps) {
  return (
    <>
      {addresses
        .sort((_, b) => (b.isMain ? 1 : -1))
        .map((address) => {
          return (
            <div
              key={address.id}
              className="flex py-4 justify-between items-center
              border-b-2 hover:bg-mainBrighterColor cursor-pointer"
              onClick={() => handleMainChangeAddress(address)}
            >
              {address.isMain ? (
                <div className="flex flex-col gap-1 w-full">
                  <div className="border max-w-max bg-mainBrighterColor mx-2">
                    <p className="text-mainColor font-bold mx-2 text-sm">
                      현재 설정된 주소
                    </p>
                  </div>
                  <div className="font-bold text-lg flex items-center gap-1">
                    <MdLocationOn className="w-6 h-6" />
                    <p>{address.name}</p>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-1 w-full">
                  <MdOutlineLocationOn className="w-6 h-6" />
                  <p>{address.name}</p>
                </div>
              )}
              <div
                className="whitespace-nowrap mx-2"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteAddress(address);
                }}
              >
                삭제
              </div>
            </div>
          );
        })}
    </>
  );
}
