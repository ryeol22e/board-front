import { AUTHORIZATION, CONTENT_TYPE } from '@/constants/common';
import { tokenUtil } from '../token-util';
import {
  createHttpError,
  FetchOptions,
  flatQuery,
  PATH_REGEX,
  ResponseApi,
  responseData,
} from './zconfig';

const getHeader = async (isServer: boolean, options?: FetchOptions) => {
  const { getAccessToken } = tokenUtil();
  const accessToken = await getAccessToken();
  const headers: Record<string, string> = {};

  if (isServer) {
    headers['Cookie'] = (
      await (await import('next/headers')).cookies()
    ).toString();
  }

  if (accessToken && accessToken !== '') {
    headers[AUTHORIZATION] = `Bearer ${accessToken}`;
  }
  if (options && 'body' in options && !(options.body instanceof FormData)) {
    headers[CONTENT_TYPE] = 'application/json; utf-8';
  }

  return { ...(options?.headers || {}), ...headers };
};

const getURL = (isServer: boolean, url: string, options?: FetchOptions) => {
  // set query string
  if (options && 'query' in options && options?.query) {
    url += '?'.concat(flatQuery(options.query));
  }

  return `${
    isServer && PATH_REGEX.test(url) ? process.env.NEXT_API_URL : ''
  }${url}`;
};

const getBody = (options: FetchOptions) => {
  let body: BodyInit | undefined = undefined;
  // set body data
  if (options && 'body' in options && options.body) {
    const bodyType = options.body;

    if (
      bodyType instanceof Blob ||
      bodyType instanceof ArrayBuffer ||
      bodyType instanceof FormData ||
      bodyType instanceof URLSearchParams ||
      bodyType instanceof ReadableStream ||
      bodyType instanceof String
    ) {
      body = options.body as ReadableStream | XMLHttpRequestBodyInit;
    } else {
      body = JSON.stringify(options.body) satisfies BodyInit;
    }
  }

  if (!['get', 'delete'].includes(options?.method || 'get') && !body) {
    body = '{}';
  }

  return body;
};

type AppFetchType = {
  // none generic native fetch api
  (
    url: string,
    options?: FetchOptions & { useNative: true },
    timeout?: number
  ): Promise<Response>;
  // require generic wrap ResponseApi type
  <R>(url: string, options?: FetchOptions, timeout?: number): Promise<
    ResponseApi<R>
  >;
};

/**
 * app fetch
 */
export const appFetch = (async <R>(
  url: string,
  options?: FetchOptions,
  timeout: number = 2000
): Promise<ResponseApi<R> | Response> => {
  let timer: NodeJS.Timeout | null = null;
  const abortController = new AbortController();

  const isServer = typeof window === 'undefined';
  const fetchURL = getURL(isServer, url, options);

  options = {
    ...options,
    signal: abortController.signal,
    headers: await getHeader(isServer, options),
  };

  try {
    timer = setTimeout(() => {
      abortController.abort();
    }, timeout);

    const response = await fetch(fetchURL, {
      ...options,
      body: getBody(options),
    });

    if (!response.ok) {
      throw await createHttpError(response);
    }

    return 'useNative' in options ? response : responseData<R>(response);
  } catch (error) {
    if (error instanceof DOMException && error.name === 'AbortError') {
      throw new Error('Request timed out');
    }

    throw error;
  } finally {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
  }
}) as AppFetchType;
