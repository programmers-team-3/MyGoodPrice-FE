import Button from "@/components/Button/Button";
import SearchBar from "@/components/SearchBar/SearchBar";
import StoreOverview from "@/components/Overview/StoreOverview";
import { IoFilter } from "react-icons/io5";
import { useState } from "react";
import Modal from "@/components/Layout/ModalLayout";
import FilterBox from "@/components/FilterBox/FilterBox";
import { dummyFoodFilterData } from "@/store/data";

export default function Home() {
  const [current, setCurrent] = useState<number>(1);
  const [input, setInput] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);

  return (
    <div
      className={`h-full w-full flex flex-col gap-4 transition duration-300
      overflow-hidden ${open && "opacity-40 blur-xs"} py-4 m-4 self-center
      justify-start`}
    >
      <div className="flex gap-4 justify-between items-center">
        <div className="flex gap-4 overflow-x-scroll">
          {dummyFoodFilterData.map((data) => {
            return (
              <Button
                key={data.id}
                isActive={current === data.id}
                size={"medium"}
                name={data.name}
                handleSetCurrent={() => setCurrent(data.id)}
              />
            );
          })}
        </div>
        <IoFilter
          className="w-8 h-8 text-subColor
      transition duration-300 hover:text-subDarkColor cursor-pointer"
          onClick={() => setOpen(true)}
        />
      </div>
      <SearchBar
        value={input}
        handleChangeText={(text: string) => setInput(text)}
      />
      <StoreOverview />
      {open && (
        <Modal isOpen={open} setOpen={setOpen}>
          <FilterBox rtl={false} />
        </Modal>
      )}
    </div>
  );
}
