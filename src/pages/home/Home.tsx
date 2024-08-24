import Button from "@/components/Button/Button";
import SearchBar from "@/components/SearchBar/SearchBar";
import StoreOverview from "@/components/Overview/StoreOverview";
import { IoFilter } from "react-icons/io5";
import { useState } from "react";
import Modal from "@/components/Layout/ModalLayout";
import FilterBox from "@/components/FilterBox/FilterBox";

const dummyFoodFilterData = [
  {
    id: 1,
    name: "한식",
  },
  {
    id: 2,
    name: "중식",
  },
  {
    id: 3,
    name: "양식",
  },
  {
    id: 4,
    name: "일식",
  },
  {
    id: 5,
    name: "기타",
  },
];
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
      <div className="flex items-center justify-between gap-8">
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
          className="w-8 h-8 transition duration-300 cursor-pointer text-subColor hover:text-subDarkColor"
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
          <FilterBox rtl={false} handleCloseModal={() => setOpen(false)} />
        </Modal>
      )}
    </div>
  );
}
