import { MdLocationOn } from "react-icons/md";

type SaveAddressProps = {
  address: string;
  handleDeleteAddress: (address: string) => void;
};

export default function SaveAddress({
  address,
  handleDeleteAddress,
}: SaveAddressProps) {
  // console.log(address);

  return (
    <>
      {address && (
        <div className="flex items-center justify-between py-4 border-b-2 cursor-pointer hover:bg-mainBrighterColor">
          <div className="flex flex-col w-full gap-1">
            <div className="mx-2 border max-w-max bg-mainBrighterColor">
              <p className="mx-2 text-sm font-bold text-mainColor">
                현재 설정된 주소
              </p>
            </div>
            <div className="flex items-center gap-1 text-lg font-bold">
              <MdLocationOn className="w-6 h-6" />
              <p>{address}</p>
            </div>
          </div>
          <div
            className="mx-2 whitespace-nowrap"
            onClick={(e) => {
              e.stopPropagation();
              handleDeleteAddress(address);
            }}
          >
            삭제
          </div>
        </div>
      )}
    </>
  );
}
