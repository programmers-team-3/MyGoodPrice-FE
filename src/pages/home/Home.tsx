import Button from "@/components/Button/Button";
import SearchBar from "@/components/SearchBar/SearchBar";
import Loading from "@/components/Loading/LoadingBar";
import StoreOverview from "@/components/Overview/StoreOverview";
import { IoFilter } from "react-icons/io5";
import { GrPowerReset } from "react-icons/gr";
import { useState, useEffect } from "react";
import Modal from "@/components/Layout/ModalLayout";
import FilterBox from "@/components/FilterBox/FilterBox";
import useShopStore from "@/store/useShopStore";
import useUserStore from "@/store/useUserStore";
import axios from "axios";

export default function Home() {
  const {
    categoryFilter,
    setCurrentShopData,
    currentShopData,
    currentFilter,
    setFilter,
  } = useShopStore();
  const { loading, setLoading } = useUserStore();
  const [current, setCurrent] = useState<string>("전체");
  const [disableButton, setDisableButton] = useState<string | null>("전체");
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    const fetchShopData = async () => {
      if (currentShopData === null) {
        const url = `${
          import.meta.env.VITE_PRODUCTION_API_BASE_URL
        }/stores?page=1&limit=15&category=null&maxPrice=null&minPrice=null&location=null&search=null`;

        try {
          const res = await axios.get(url, { withCredentials: true });
          setCurrentShopData(res.data);
        } catch (error) {
          console.error("Failed to fetch shop data:", error);
          setCurrentShopData([]);
        }
      }
    };

    fetchShopData();
  }, [currentShopData, setCurrentShopData]);

  // [API] ('/shop') : 검색
  const searchShop = async () => {
    const url = `${
      import.meta.env.VITE_PRODUCTION_API_BASE_URL
    }/stores?page=1&limit=${
      currentFilter.limit
    }&category=null&maxPrice=null&minPrice=null&location=null&search=${
      currentFilter.input
    }`;
    try {
      setLoading(true);
      const res = await axios.get(url, { withCredentials: true });
      // console.log(res);
      setCurrentShopData(res.data);
      setFilter({
        ...currentFilter,
        isEnd: res.data.length !== currentFilter.limit,
      });
      setLoading(false);
    } catch (error) {
      console.log(error);
    } finally {
    }
  };

  const resetShop = () => {
    setCurrentShopData(null);
    setCurrent("전체");
    setFilter({
      input: "",
      minPrice: 0,
      maxPrice: 10000,
      location: {
        state: null,
        city: null,
      },
      page: 1,
      limit: 15,
      category: null,
      checkFilter: [false, false, false],
      isEnd: false,
    });
    setDisableButton("전체");
  };

  return (
    <div
      className={`h-full w-full flex flex-col gap-4 transition duration-300
      overflow-hidden ${open && "opacity-40 blur-xs"} py-4 m-4 self-center
      justify-start`}
    >
      {loading && <Loading text="가게 찾는 중.." />}
      <div className="flex items-center justify-between gap-8">
        <GrPowerReset
          className="w-8 h-8 transition duration-300 cursor-pointer text-subColor hover:text-subDarkColor"
          onClick={() => resetShop()}
        />
        <div className="flex gap-4 overflow-x-scroll">
          {categoryFilter.map((data) => {
            return (
              <Button
                key={data.id}
                isActive={current === data.name}
                isUsed={disableButton === null}
                size={"medium"}
                name={data.name}
                handleSetCurrent={() => setCurrent(data.name)}
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
        value={currentFilter.input}
        handleSearch={searchShop}
        handleChangeText={(text: string) =>
          setFilter({
            ...currentFilter,
            input: text,
          })
        }
      />
      <StoreOverview currentCategory={current} pageType="main" />
      {open && (
        <Modal isOpen={open} setOpen={setOpen}>
          <FilterBox
            rtl={false}
            handleCloseModal={() => setOpen(false)}
            handleCategoryString={(name) => {
              setDisableButton(name === "전체" ? null : name);
              setCurrent(name === null ? "전체" : name);
            }}
          />
        </Modal>
      )}
    </div>
  );
}
