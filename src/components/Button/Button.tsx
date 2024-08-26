type ButtonProps = {
  isActive: boolean;
  isUsed?: boolean;
  size: "small" | "medium" | "large";
  name?: string;
  handleSetCurrent?: () => void;
};
export default function Button({
  isActive,
  isUsed = true,
  size,
  name = "empty",
  handleSetCurrent,
}: ButtonProps) {
  const baseClasses = "focus:outline-none transition duration-300 font-bold";
  const activeClasses = isActive
    ? "bg-mainColor text-mainBrighterColor hover:bg-mainDarkColor"
    : isUsed
    ? "bg-mainBrighterColor text-mainColor"
    : "bg-mainBrighterColor text-mainColor hover:bg-mainBrightColor";

  const sizeClasses = {
    small: "px-4 py-1 text-sm rounded",
    medium: "px-6 py-1 text-xl rounded-2xl",
    large: "px-8 py-2 text-3xl rounded-xl",
  };

  return (
    <button
      className={`${baseClasses} ${activeClasses} ${sizeClasses[size]} whitespace-nowrap`}
      disabled={!isUsed}
      onClick={handleSetCurrent}
    >
      {name}
    </button>
  );
}
