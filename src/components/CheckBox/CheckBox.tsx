import { FaCheck } from "react-icons/fa";

type CheckBoxProps = {
  isChecked: boolean;
  id: number;
  handleCheck: (isChecked: boolean) => void;
};
export default function CheckBox({
  id,
  handleCheck,
  isChecked,
}: CheckBoxProps) {
  return (
    <div className="flex items-center">
      <input
        type="checkbox"
        id={`checkbox-${id}`}
        checked={isChecked}
        onChange={() => handleCheck(!isChecked)}
        className="hidden"
      />
      <label
        htmlFor={`checkbox-${id}`}
        className={`flex items-center justify-center cursor-pointer w-6 h-6 rounded
          ${isChecked ? "bg-mainColor " : "border-2 border-subDarkColor"}`}
      >
        {isChecked && <FaCheck className="text-mainBrighterColor" />}
      </label>
    </div>
  );
}
