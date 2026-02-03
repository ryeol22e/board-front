import { X_IS_LOGIN } from '@/constants/common';
import GlobalProvider from '@/contexts/GlobalContext';
import UserAgentProvider from '@/contexts/UserAgentContext';
import { ChildrenType } from '@/types/base';
import { UserInfoType } from '@/types/user';
import { appFetch } from '@/utils/fetch/app-fetch';
import { headers } from 'next/headers';
import { userAgent } from 'next/server';

export default async function Providers({ children }: Readonly<ChildrenType>) {
  const headerStore = await headers();
  const userAgentStore = userAgent({ headers: headerStore });
  const isLogin = headerStore.get(X_IS_LOGIN) === 'true';
  const global: {
    isLogin: boolean;
    userInfo: UserInfoType | null;
    cartCount: number;
  } = {
    isLogin: false,
    userInfo: null,
    cartCount: 0,
  };

  if (isLogin) {
    const { data: userInfo } = await appFetch<UserInfoType>('/api/user').catch(
      () => ({ data: null }),
    );

    global.isLogin = isLogin;
    global.userInfo = userInfo;
  }

  return (
    <UserAgentProvider userAgent={userAgentStore}>
      <GlobalProvider global={global}>{children}</GlobalProvider>
    </UserAgentProvider>
  );
}
