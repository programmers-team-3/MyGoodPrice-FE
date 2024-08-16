import Button from '@/components/Button/Button';
import SearchBar from '@/components/SearchBar/SearchBar';
import StoreOverview from '@/components/Overview/StoreOverview';
import { IoFilter } from 'react-icons/io5';
import { useState } from 'react';
import Modal from '@/components/Modal/Modal';
import FilterBox from '@/components/FilterBox/FilterBox';

const dummyFoodFilterData = [
  {
    id: 1,
    name: '한식',
  },
  {
    id: 2,
    name: '중식',
  },
  {
    id: 3,
    name: '양식',
  },
  {
    id: 4,
    name: '일식',
  },
];
export default function HomePage() {
  const [current, setCurrent] = useState<number>(1);
  const [input, setInput] = useState<string>('');
  const [open, setOpen] = useState<boolean>(false);

  return (
    <div
      className={`h-full flex flex-col gap-2 transition duration-300
      overflow-hidden ${open && 'opacity-40'}`}
    >
      <div className="flex gap-8 m-4 justify-center items-center">
        {/* <Button isActive={true} size={'small'} name={'Category'} /> */}
        <div className="flex gap-4">
          {dummyFoodFilterData.map((data) => {
            return (
              <Button
                key={data.id}
                isActive={current === data.id}
                size={'medium'}
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
