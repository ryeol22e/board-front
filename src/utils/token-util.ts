import { ACCESS_TOKEN } from '@/constants/common';

export const tokenUtil = () => {
  return {
    async getAccessToken() {
      const isServer = typeof window === 'undefined';

      try {
        if (isServer) {
          const cookieStore = await (await import('next/headers')).cookies();
          return cookieStore.get(ACCESS_TOKEN)?.value;
        } else {
          return await fetch('/api/access-token').then(
            async (res) => await res.text()
          );
        }
      } catch {
        return '';
      }
    },
  };
};
