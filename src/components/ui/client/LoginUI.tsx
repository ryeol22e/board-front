'use client';

import { clearCache } from '@/actions/common';
import { appFetch } from '@/utils/fetch/app-fetch';
import { useRouter } from 'next/navigation';

export default function LoginUI() {
  const { replace } = useRouter();
  const handleLogin = async () => {
    const { data } = await appFetch<boolean>('/api/login', {
      method: 'post',
    });

    if (data) {
      clearCache();
      replace('/');
    }
  };
  return <button onClick={handleLogin}>로그인</button>;
}
