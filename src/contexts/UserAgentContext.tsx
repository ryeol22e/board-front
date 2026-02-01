'use client';

import type { ChildrenType, UserAgentType } from '@/types/base';
import { createContext, useRef } from 'react';

type UserAgentProviderProps = { userAgent: UserAgentType } & ChildrenType;
export const UserAgentContext = createContext<UserAgentType | undefined>(
  undefined,
);

export default function UserAgentProvider({
  children,
  userAgent,
}: Readonly<UserAgentProviderProps>) {
  const agent = useRef(userAgent);

  return (
    <UserAgentContext.Provider value={agent.current}>
      {children}
    </UserAgentContext.Provider>
  );
}
