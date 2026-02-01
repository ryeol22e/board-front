'use server';

import { NextRequest } from 'next/server';
import { createHttpError, PATH_REGEX } from './zconfig';

async function getBody(request: NextRequest) {
  const method = request?.method?.toLocaleLowerCase?.() || 'get';

  if (!['get', 'delete'].includes(method)) {
    try {
      return JSON.stringify(await request.json());
    } catch {}

    try {
      return await request.formData();
    } catch {}

    try {
      return await request.text();
    } catch {}

    try {
      return await request.arrayBuffer();
    } catch {}

    try {
      return await request.bytes();
    } catch {}

    try {
      return await request.blob();
    } catch {}
  }

  return undefined;
}

/**
 * app api가 백엔드 API 서버와 통신하기 위한 fetch 래퍼 함수.
 * @param path
 * @param options
 */
export const routeFetch = async (
  request: NextRequest,
  options: Omit<RequestInit, 'method' | 'body'> = {},
): Promise<Response> => {
  const url = request.nextUrl;
  const path = `${url.pathname}${
    url?.search && url.search !== '' ? url.search : ''
  }`;
  const method = request?.method?.toLocaleLowerCase?.() || 'get';
  const headers = [
    ...request.headers.entries(),
    ...new Headers(options?.headers).entries(),
  ];
  const fetchOptions: RequestInit = {
    method,
    headers: {},
  };

  for (const [key, value] of headers) {
    if (key && key !== '' && value) {
      (fetchOptions.headers as Record<string, string>)[key] = value;
    }
  }

  const response = await fetch(
    `${PATH_REGEX.test(path) ? process.env.NEXT_API_URL : ''}${path}`,
    {
      ...fetchOptions,
      body: await getBody(request),
    },
  );

  if (!response.ok) {
    throw await createHttpError(response);
  }

  return response;
};
