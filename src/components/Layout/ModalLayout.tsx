import { ReactNode, useEffect } from "react";
import { createPortal } from "react-dom";
import { IoIosClose } from "react-icons/io";
import { GrPowerReset } from "react-icons/gr";
import styled from "styled-components";

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

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  const handleReset = () => {
    console.log("handle Reset");
    // zustand 상태 초기화
  };

  return createPortal(
    <ModalLayout
      className="flex flex-col fixed right-1/2 top-0 translate-x-1/2
    w-1/2 z-10"
    >
      {isOpen ? (
        <MobileLayout className="mx-6 border-y-2 border-subDarkColor h-full relative">
          <div
            className="absolute left-2 top-4 flex gap-2 items-center cursor-pointer"
            onClick={() => handleReset()}
          >
            {isReset && (
              <>
                <GrPowerReset
                  className="w-8 h-8
            transition-transform duration-300 ease-in-out hover:rotate-90"
                />
                <p>초기화</p>
              </>
            )}
          </div>
          <IoIosClose
            className="absolute right-0 w-16 h-16 cursor-pointer"
            onClick={() => setOpen(false)}
          />
          <div className="mt-header pb-footer h-full">{children}</div>
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
