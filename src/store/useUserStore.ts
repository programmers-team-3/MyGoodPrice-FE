import { create } from 'zustand';

const useUserStore = create((set) => ({
  userInfo: {}, // id, name, token ...

  // setUserInfo
  // getUserInfo
  // ...
}));

export default useUserStore;
