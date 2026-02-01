'use client';

import { createGlobalStore, GlobalStoreType } from '@/stores/global-store';
import { ChildrenType } from '@/types/base';
import { createContext, useContext, useEffect, useRef } from 'react';
import { useStore } from 'zustand';

type GlobalContextType = ReturnType<typeof createGlobalStore>;
type GlobalStateType = Pick<GlobalStoreType, 'isLogin' | 'userInfo' | 'cartCount'>;
export const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export default function GlobalProvider({ global, children }: Readonly<{ global: GlobalStateType } & ChildrenType>) {
  const storeRef = useRef<GlobalContextType>(createGlobalStore(global));

  useEffect(() => {
    storeRef.current.getState().setGlobal(global);
  }, [global]);

  return <GlobalContext.Provider value={storeRef.current}>{children}</GlobalContext.Provider>;
}

export const useGlobalStore = <T,>(selector: (store: GlobalStoreType) => T): T => {
  const globalContext = useContext(GlobalContext);

  if (!globalContext) {
    throw new Error('not exists global context.');
  }

  return useStore(globalContext, selector);
};
