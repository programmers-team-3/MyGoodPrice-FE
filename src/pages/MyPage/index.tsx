import axios from "axios";
import { useNavigate } from "react-router-dom";
import { IoIosLogOut } from "react-icons/io";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { useEffect, useState } from "react";
import Button from "@/components/Button/Button";
import Modal from "@/components/Layout/ModalLayout";
import StoreOverview from "@/components/Overview/StoreOverview";
import LocationBox from "@/components/AddressBox/AddressBox";
import SaveAddress from "@/components/AddressBox/SaveAddress";
import { AddressTypes } from "@/types";
import { Address } from "react-daum-postcode";

const MyPage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<string | null>(null);
  const [addresses, setAddresses] = useState<AddressTypes[]>([]);
  const [open, setOpen] = useState(false);
  const [showList, setShowList] = useState(true);

  useEffect(() => {
    const TOKEN = localStorage.getItem("token");
    if (!TOKEN) {
      navigate("/login");
    } else setUser(TOKEN);
  }, [navigate]);

  const logout = async () => {
    const TOKEN = localStorage.getItem("token");
    axios
      .post(
        "https://kapi.kakao.com/v1/user/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${TOKEN}`,
          },
        }
      )
      .then(() => {
        localStorage.removeItem("token");
        navigate("/login");
      })
      .catch((error) => {
        console.error("카카오 로그아웃 실패", error);
      });
  };

  const moveAnalyze = () => {
    navigate("/analyze");
  };

  const addAddress = (address: Address) => {
    setAddresses((prev) => [
      ...prev,
      {
        id: address.buildingCode,
        name: address.roadAddress,
        isMain: prev.length === 0,
      },
    ]);
    setOpen(false);
  };

  const deleteAddress = (address: AddressTypes) => {
    setAddresses((prevAddresses) => {
      const isMainAddress = address.isMain;
      const updatedAddresses = prevAddresses.filter(
        (adr) => adr.id !== address.id
      );
      if (isMainAddress)
        if (updatedAddresses.length > 0) updatedAddresses[0].isMain = true;
      return updatedAddresses;
    });
  };

  const changeMainAddress = (selectedAddress: AddressTypes) => {
    setAddresses((prevAddresses) =>
      prevAddresses.map((address) =>
        address.id === selectedAddress.id
          ? { ...address, isMain: true }
          : { ...address, isMain: false }
      )
    );
  };
  return (
    <div
      className={`h-full w-full flex flex-col py-4 m-4
    min-w-minPage gap-6 transition duration-300 
    overflow-y-scroll ${open && "opacity-40 blur-xs"} self-center
    justify-start`}
    >
      <div className="flex items-end gap-1 font-bold relative">
        <span className="text-2xl text-mainDarkColor">{user?.slice(0, 8)}</span>
        <span className="text-lg"> 님의 페이지</span>
        <IoIosLogOut
          className="cursor-pointer absolute w-8 h-8 top-0 right-0 text-subColor"
          onClick={logout}
        />
      </div>
      <div className="flex flex-col gap-4">
        <div className="relative border-b-2">
          <p className="text-xl font-bold text-mainColor">위치 저장</p>
          <AiOutlinePlus
            className="w-6 h-6 cursor-pointer absolute -translate-y-1/2 top-1/2 right-2"
            onClick={() => setOpen(true)}
          />
        </div>
        {addresses.length ? (
          <SaveAddress
            addresses={addresses}
            handleDeleteAddress={deleteAddress}
            handleMainChangeAddress={changeMainAddress}
          />
        ) : (
          <p>등록된 주소가 없습니다.</p>
        )}
      </div>
      <div className="flex flex-col gap-4">
        <div className="relative border-b-2">
          <p className="text-xl font-bold text-mainColor">
            내가 찜한 가게 리스트
          </p>
          {showList ? (
            <AiOutlineMinus
              className="w-6 h-6 cursor-pointer absolute -translate-y-1/2 top-1/2 right-2"
              onClick={() => setShowList(false)}
            />
          ) : (
            <AiOutlinePlus
              className="w-6 h-6 cursor-pointer absolute -translate-y-1/2 top-1/2 right-2"
              onClick={() => setShowList(true)}
            />
          )}
        </div>
        {showList ? <StoreOverview /> : null}
      </div>

      <Button
        isActive={true}
        size="large"
        name="내가 찜한 가게 분석하기"
        handleSetCurrent={moveAnalyze}
      />
      {open && (
        <Modal isOpen={open} setOpen={setOpen} isReset={false}>
          <LocationBox handleAddress={(address) => addAddress(address)} />
        </Modal>
      )}
    </div>
  );
};

export default MyPage;
