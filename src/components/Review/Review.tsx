import { useState } from "react";
import { MdOutlineRateReview } from "react-icons/md";

export const Review = () => {
  const [review, setReview] = useState<string>("");
  const [reviewsList, setReviewsList] = useState<string[]>([]);

  const handleReviewChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setReview(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (review.trim()) {
      setReviewsList([review, ...reviewsList]);
      setReview("");
    }
  };

  return (
    <div className="w-full h-full px-5 mx-auto">
      <h2 className="flex items-center mb-4 text-xl font-bold">
        <MdOutlineRateReview className="mt-1 mr-1" />
        리뷰
      </h2>
      <form onSubmit={handleSubmit}>
        <textarea
          className="w-full h-16 p-2 overflow-y-auto border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={review}
          onChange={handleReviewChange}
          rows={4}
          placeholder="리뷰를 남겨주세요..."
        />
        <button
          type="submit"
          className="w-full p-2 mt-2 text-white bg-mainColor rounded-xl hover:bg-mainDarkColor"
        >
          제출하기
        </button>
      </form>
      <div className="mt-4">
        <h3 className="text-lg font-semibold">최근 리뷰</h3>
        <ul className="pl-5 list-disc">
          {reviewsList.map((rev, index) => (
            <li key={index} className="mt-1">
              {rev}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
