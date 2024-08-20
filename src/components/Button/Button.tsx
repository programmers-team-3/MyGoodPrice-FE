type ButtonProps = {
  isActive: boolean;
  size: "small" | "medium" | "large";
  name?: string;
  handleSetCurrent?: () => void;
};
export default function Button({
  isActive,
  size,
  name = "empty",
  handleSetCurrent,
}: ButtonProps) {
  const baseClasses = "focus:outline-none transition duration-300 font-bold";
  const activeClasses = isActive
    ? "bg-mainColor text-mainBrighterColor hover:bg-mainDarkColor"
    : "bg-mainBrighterColor text-mainColor hover:bg-mainBrightColor";

  const sizeClasses = {
    small: "px-4 py-2 text-sm",
    medium: "px-6 py-1 text-xl rounded-2xl",
    large: "px-8 py-2 text-3xl rounded-xl",
  };

  return (
    <button
      className={`${baseClasses} ${activeClasses} ${sizeClasses[size]} whitespace-nowrap`}
      onClick={handleSetCurrent}
    >
      {name}
    </button>
  );
}
