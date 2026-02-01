import { UserInfoType } from '@/types/user';
import { createStore } from 'zustand';

interface GlobalStateType {
  isLogin: boolean;
  userInfo: UserInfoType | null;
  cartCount: number;
}

interface GlobalActionType {
  setGlobal: (state: GlobalStateType) => void;
}

export type GlobalStoreType = GlobalStateType & GlobalActionType;

export const createGlobalStore = (initState: GlobalStateType) => {
  return createStore<GlobalStoreType>()((set) => ({
    ...initState,
    setGlobal(state) {
      set(() => ({ ...state }));
    },
  }));
};
