import { useState } from "react";
import DaumPostcode, { Address } from "react-daum-postcode";
import Button from "../Button/Button";

type AddressBoxProps = {
  handleAddress: (address: Address) => void;
};

type roleTypes = "currentPosition" | "search" | null;
export default function AddressBox({ handleAddress }: AddressBoxProps) {
  const [role, setRole] = useState<roleTypes>(null);
  const completeHandler = (data: Address) => {
    handleAddress(data);
  };

  return (
    <div className="h-full">
      {role === null && (
        <div className="mx-4 py-8 flex flex-col gap-4">
          <Button
            isActive={true}
            name="현재 위치 정보 받기"
            size="large"
            handleSetCurrent={() => setRole("currentPosition")}
          />
          <Button
            isActive={true}
            name="주소 검색하기"
            size="large"
            handleSetCurrent={() => setRole("search")}
          />
        </div>
      )}

      {role === "search" && (
        <DaumPostcode
          onComplete={completeHandler}
          style={{ height: "100%", padding: 0 }}
        />
      )}

      {role === "currentPosition" && <div>current position searching</div>}
    </div>
  );
}
