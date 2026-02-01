import { ACCESS_TOKEN } from '@/constants/common';
import { cookies } from 'next/headers';

export const GET = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get(ACCESS_TOKEN)?.value || '';

  return new Response(token, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain',
    },
  });
};
