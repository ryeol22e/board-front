import { FetchOptions, ResponseApi } from './zconfig';
import { appFetch } from './app-fetch';

type CreateType = {
  requestInterceptor?: () => void;
  responseInterceptor?: () => void;
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
type NextFetchType = {
  create: ({ requestInterceptor, responseInterceptor }: CreateType) => void;
} & AppFetchType;

export const nextFetch: NextFetchType = Object.assign(appFetch, {
  create: () => {
    console.log('nextFetch.create() called with:');
    // 여기에 create 관련 로직을 구현합니다.
  },
});

nextFetch.create({
  requestInterceptor: () => {
    console.log('requestInterceptor called');
  },
});
