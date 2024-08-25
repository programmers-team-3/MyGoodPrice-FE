import { MdOutlineAnalytics } from "react-icons/md";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useEffect, useState } from "react";
import axios from "axios";

// Chart.js 구성 요소 등록
ChartJS.register(ArcElement, Tooltip, Legend);
const API_BASE_URL = import.meta.env.VITE_PRODUCTION_API_BASE_URL;

const LikeAnalyze = () => {
  const [data, setData] = useState(null);

  const dumydata = {
    labels: ["한식", "중식", "양식", "일식", "기타"],
    datasets: [
      {
        label: "좋아요 카테고리 분석",
        data: data ? data : [30, 20, 25, 25, 10], // API에서 받은 데이터 또는 더미 데이터
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
          "rgba(153, 102, 255, 0.6)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/myplaces/percent`);
        setData(response.data);
        console.log(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-col justify-center w-full h-full">
      <div className="flex flex-col items-center h-40">
        <h1 className="flex items-center text-3xl font-bold text-mainDarkColor">
          <MdOutlineAnalytics className="mt-1" /> 좋아요 분석
        </h1>
        <span className="mt-8">내가 어떤 카테고리를 많이 사용하는지</span>
        <span className="text-lg font-bold">
          좋아요를 많이 누른 카테고리를 분석합니다!
        </span>
      </div>
      <div className="mx-auto">
        <Doughnut data={dumydata} />
      </div>
    </div>
  );
};

export default LikeAnalyze;
