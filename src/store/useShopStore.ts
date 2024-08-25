import { CategoryFilterTypes, FilterTypes, ShopTypes } from "@/types";
import { create } from "zustand";

type shopState = {
  categoryFilter: CategoryFilterTypes[];
  currentShopData: ShopTypes[] | null;
  myShopData: ShopTypes[] | null;
  currentFilter: FilterTypes;
  sorting: {
    method: "likes" | "lexical" | "location" | null;
    isAscending: boolean;
  } | null;
  setCurrentShopData: (shopData: ShopTypes[] | null) => void;
  setMyShopData: (shopData: ShopTypes[] | null) => void;
  setFilter: (filter: Partial<shopState["currentFilter"]>) => void;
  toggleLikeShop: (shopId: string, isLiked: boolean) => void;
  sortData: (method: "likes" | "lexical" | "location" | null) => void;
};

const useShopStore = create<shopState>((set) => ({
  categoryFilter: [
    { id: 1, name: "전체" },
    { id: 2, name: "한식" },
    { id: 3, name: "중식" },
    { id: 4, name: "양식" },
    { id: 5, name: "일식" },
    { id: 6, name: "기타" },
  ],
  currentShopData: null,

  myShopData: null,
  
  currentFilter: {
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
  },

  sorting: null,

  setCurrentShopData: (shopData) =>
    set((state) => ({ ...state, currentShopData: shopData })),

  setMyShopData: (shopData) =>
    set((state) => ({ ...state, myShopData: shopData })),

  setFilter: (filter) =>
    set((state) => ({
      currentFilter: {
        ...state.currentFilter,
        ...filter,
      },
    })),

  toggleLikeShop: (id, isLiked) =>
    set((state) => {
      if (!state.currentShopData) return state;

      const updatedShops = state.currentShopData.map((shop) => {
        if (shop.id === id) {
          const currentLikes = shop.likes ?? 0;
          return {
            ...shop,
            likes: isLiked ? currentLikes - 1 : currentLikes + 1,
          };
        }
        return shop;
      });

      return { currentShopData: updatedShops };
    }),

  sortData: (method) =>
    set((state) => {
      const { isAscending } = state.sorting || {};
      const currentIsAscending = isAscending ?? false;

      const compare = (a: string | number, b: string | number) =>
        currentIsAscending ? (a < b ? -1 : 1) : a > b ? -1 : 1;

      const sortedData = [...(state.currentShopData as ShopTypes[])].sort(
        (a, b) => {
          if (method === "likes") {
            return compare(a.likes ?? 0, b.likes ?? 0);
          } else if (method === "lexical") {
            return compare(a.name, b.name);
          } else if (method === "location") {
            return compare(a.state, b.state) || compare(a.city, b.city);
          }
          return 0;
        }
      );

      return {
        currentShopData: sortedData,
        sorting: {
          method,
          isAscending: !currentIsAscending,
        },
      };
    }),
}));

export default useShopStore;
