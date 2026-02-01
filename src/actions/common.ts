'use server';

import { revalidatePath } from 'next/cache';

export const clearCache = async (
  path: string = '/',
  type: 'layout' | 'page' = 'page'
) => {
  revalidatePath(path, path === '/' ? 'layout' : type);
};
