import { ReactNode, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { IoIosClose } from 'react-icons/io';

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
  const modalRoot = document.querySelector('#filter-modal') as HTMLElement;

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return createPortal(
    <div>
      {isOpen ? (
        <div
          className="flex flex-col fixed right-1/2 top-0 translate-x-1/2
          w-1/2 h-full border z-10"
        >
          <IoIosClose
            className="absolute right-0 w-16 h-16 cursor-pointer"
            onClick={() => setOpen(false)}
          />
          <div className="my-header px-8 py-4">{children}</div>
        </div>
      ) : null}
    </div>,
    modalRoot
  );
}
