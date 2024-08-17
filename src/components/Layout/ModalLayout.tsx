import { ReactNode, useEffect } from "react";
import { createPortal } from "react-dom";
import { IoIosClose } from "react-icons/io";
import styled from "styled-components";

type ModalProps = {
  isOpen: boolean;
  setOpen: (boolean: boolean) => void;
  children?: ReactNode;
};

export default function Modal({
  isOpen = false,
  setOpen,
  children,
}: ModalProps) {
  const modalRoot = document.querySelector("#filter-modal") as HTMLElement;

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return createPortal(
    <ModalLayout
      className="flex flex-col fixed right-1/2 top-0 translate-x-1/2
    w-1/2 h-full z-10"
    >
      {isOpen ? (
        <div className="mx-12 border-y-2 border-subDarkColor">
          <IoIosClose
            className="absolute right-8 w-16 h-16 cursor-pointer"
            onClick={() => setOpen(false)}
          />
          <div className="my-header px-12 py-4">{children}</div>
        </div>
      ) : null}
    </ModalLayout>,
    modalRoot
  );
}

const ModalLayout = styled.div`
  margin-top: 8vh;

  @media (max-width: 768px) {
    width: 80%;
  }
`;
