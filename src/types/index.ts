export type UserTypes = {
  id: string;
  name: string;
  token: string;
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
  id: number;
  shopName: string;
  region: string;
  address: string;
  tel: string;
  category: string;
  menu: MenuTypes[];
};
