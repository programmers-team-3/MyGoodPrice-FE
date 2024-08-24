import { ChangeEvent, useState, KeyboardEvent } from "react";
import { IoIosSearch } from "react-icons/io";
type SearchBarProps = {
  value: string;
  handleChangeText: (text: string) => void;
  handleSearch: () => void;
};
export default function SearchBar({
  value,
  handleChangeText,
  handleSearch,
}: SearchBarProps) {
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSearch();
    }
  };
  return (
    <div className="relative w-full rounded-l bg-mainBrightColor">
      <input
        type="text"
        value={value}
        className="appearance-none border rounded w-full p-2"
        placeholder="가게 검색"
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          handleChangeText(e?.target.value)
        }
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onKeyDown={handleKeyDown}
      />
      <IoIosSearch
        onClick={handleSearch}
        className={`absolute right-4 top-1/2 transition duration-300
      -translate-y-1/2 w-8 h-8 cursor-pointer
      ${isFocused ? "text-mainColor" : "text-subDarkColor"}`}
      />
    </div>
  );
}
