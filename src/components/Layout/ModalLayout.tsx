import { ReactNode, useEffect } from "react";
import { createPortal } from "react-dom";
import { IoIosClose } from "react-icons/io";
import { GrPowerReset } from "react-icons/gr";
import styled from "styled-components";
import useShopStore from "@/store/useShopStore";

type ModalProps = {
  isOpen: boolean;
  setOpen: (boolean: boolean) => void;
  children?: ReactNode;
  isReset?: boolean;
};

export default function Modal({
  isOpen = false,
  setOpen,
  children,
  isReset = true,
}: ModalProps) {
  const modalRoot = document.querySelector("#filter-modal") as HTMLElement;
  const { setFilter } = useShopStore();
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  const handleReset = () => {
    setFilter({
      input: "",
      minPrice: 0,
      maxPrice: 10000,
      location: {
        state: null,
        city: null,
      },
      page: 1,
      limit: 15,
      category: null,
      checkFilter: [false, false, false],
      isEnd: false,
    });
  };

  return createPortal(
    <ModalLayout className="fixed top-0 z-10 flex flex-col w-1/2 translate-x-1/2 right-1/2">
      {isOpen ? (
        <MobileLayout className="relative h-full p-2 mx-6 border-2 border-subDarkColor bg-mainBrightColor rounded-xl opacity-9">
          <div
            className="absolute flex items-center gap-2 cursor-pointer left-2 top-4"
            onClick={() => handleReset()}
          >
            {isReset && (
              <>
                <GrPowerReset className="w-8 h-8 transition-transform duration-300 ease-in-out hover:rotate-90" />
                <p>초기화</p>
              </>
            )}
          </div>
          <IoIosClose
            className="absolute right-0 w-16 h-16 cursor-pointer"
            onClick={() => setOpen(false)}
          />
          <div className="h-full mt-header pb-footer">{children}</div>
        </MobileLayout>
      ) : null}
    </ModalLayout>,
    modalRoot
  );
}

const ModalLayout = styled.div`
  margin: 18vh 0 20vh 0;
  padding: 0 8vh;
  height: 62vh;
  @media (max-width: 768px) {
    width: 80%;
    padding: 0 2vh;
    margin: 20vh 0 22vh 0;
    height: 58vh;
  }
`;

const MobileLayout = styled.div`
  @media (max-width: 768px) {
    margin: 0;
  }
`;
