export default function Loading({ text }: { text: string }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center backdrop-blur-xs">
      <div className="flex flex-col items-center">
        <div
          className="animate-spin rounded-full
        h-16 w-16 border-t-4 border-mainDarkColor border-solid border-opacity-50"
        ></div>
        {text && (
          <p className="mt-4 font-bold text-mainDarkColor text-2xl">{text}</p>
        )}
      </div>
    </div>
  );
}
