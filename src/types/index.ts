export type UserTypes = {
  id: string;
  name: string;
  token: string;
  likes: string[];
  location: {
    latitude: string;
    longitude: string;
  };
};

export type MenuTypes = {
  id: number;
  menu: string;
  price: number;
};

export type ShopTypes = {
  id: string;
  name: string;
  state: string;
  city: string;
  address: string;
  tel: string;
  category: string;
  likes?: number;
  menu: MenuTypes[];
};

export type CategoryFilterTypes = {
  id: number;
  name: string;
};

export type FilterTypes = {
  input: string;
  minPrice: number | null;
  maxPrice: number | null;
  location: {
    state: string | null;
    city: string | null;
  };
  category: string | null;
  checkFilter: boolean[];
  page: number | null;
  limit: number;
  isEnd: boolean;
};

export type AddressTypes = {
  id: string;
  name: string;
  isMain: boolean;
};

export type AttributeType = {
  id: number;
  name: string;
  isSorting: "lexical" | "likes" | "location" | null;
};
