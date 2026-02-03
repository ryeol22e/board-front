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
  return (
    <button
      onClick={handleLogin}
      className="w-full py-4 bg-[#3182F6] hover:bg-[#1B64DA] text-white font-bold rounded-xl text-lg transition-all active:scale-[0.98]"
    >
      로그인
    </button>
  );
}
