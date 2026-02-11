import { ACCESS_TOKEN } from '@/constants/common';
import { jwtVerify } from 'jose';

const secretKey = Buffer.from(process.env.NEXT_JWT_KEY as string, 'base64');

export const tokenUtil = () => {
  return {
    async getAccessToken() {
      const isServer = !typeof globalThis.window;

      try {
        if (isServer) {
          const cookieStore = await (await import('next/headers')).cookies();
          return cookieStore.get(ACCESS_TOKEN)?.value;
        } else {
          return await fetch('/api/access-token').then(
            async (res) => await res.text(),
          );
        }
      } catch {
        return '';
      }
    },
    async verifyToken(token: string) {
      return await jwtVerify(token, secretKey, {
        algorithms: ['HS256'], // 알고리즘 명시 권장
      });
    },
  };
};
