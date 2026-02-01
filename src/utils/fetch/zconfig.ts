export type ResponseApi<R> = {
  status: number;
  message: string;
  data: R | null;
};

type RequestParameterType =
  | object
  | Record<
      string,
      | undefined
      | null
      | string
      | number
      | boolean
      | object
      | Array<string | number | boolean | object>
    >;

export class HttpError extends Error {
  status: number;
  body: unknown;

  constructor(message: string, status: number, body: unknown) {
    super(message);
    this.name = 'HttpError';
    this.status = status;
    this.body = body;
  }
}

interface QueryFetchOptions extends Omit<RequestInit, 'method' | 'body'> {
  method?: 'get' | 'delete';
  query?: RequestParameterType;
}
interface BodyFetchOptions extends Omit<RequestInit, 'method' | 'body'> {
  method: 'post' | 'put' | 'patch';
  body?: RequestInit['body'] | RequestParameterType;
}

export type FetchOptions = QueryFetchOptions | BodyFetchOptions;

/**
 * flatting query object to array
 * @param data
 * @returns
 */
const flatQueryArray = (query: object, parentKey?: string) => {
  let array: Array<string> = [];

  for (const [key, value] of Object.entries(query)) {
    if (value) {
      const combineKey = parentKey ? parentKey.concat('.').concat(key) : key;

      if (typeof value === 'object') {
        if (Array.isArray(value)) {
          array = array.concat(
            value.flatMap((item, index) =>
              typeof item === 'object'
                ? flatQueryArray(item, combineKey.concat(`[${index}]`))
                : [`${combineKey}[${index}]=${item}`],
            ),
          );
        } else {
          array = array.concat(flatQueryArray(value, combineKey));
        }
      } else {
        array.push(`${combineKey}=${value}`);
      }
    }
  }

  return array;
};

/**
 * path pattern check
 */
export const PATH_REGEX =
  /^\/(?:[a-z0-9-._~!$&'()*+,;=:@%]|%[0-9a-f]{2})*(?:[/?#][a-z0-9-._~!$&'()*+,;=:@%/?#])*/i;

/**
 * query string
 * @param query
 * @returns
 */
export const flatQuery = (query: object) => flatQueryArray(query).join('&');

/**
 * 응답이 'ok'가 아닐 때 HttpError 객체를 생성.
 * @param response The fetch response object.
 */
export async function createHttpError(response: Response): Promise<HttpError> {
  const cloneText = response.clone();
  let errorBody: unknown;

  try {
    errorBody = await response.json();
  } catch {
    errorBody = undefined;
  }

  if (!errorBody) {
    try {
      errorBody = await cloneText.text();
    } catch {
      errorBody = 'unknown error';
    }
  }

  return new HttpError(
    `API Error: ${response.status} ${response.statusText}`,
    response.status,
    typeof errorBody !== 'string'
      ? (errorBody as Record<string, string>).message
      : errorBody,
  );
}

/**
 * Content-Type에 따라 응답을 파싱하여 ResponseApi<T> 형태로 반환.
 * @param response The fetch response object.
 */
export async function responseData<R>(
  response: Response,
): Promise<ResponseApi<R>> {
  const cloneJson = response.clone();
  const cloneText = response.clone();
  const cloneArrayBuffer = response.clone();
  const cloneFormData = response.clone();
  const cloneBlob = response.clone();
  const cloneBytes = response.clone();
  const responseData: ResponseApi<R> = {
    status: response.status,
    message: 'success',
    data: null,
  };

  try {
    return (await cloneJson.json()) satisfies ResponseApi<R>;
  } catch {
    responseData.data = null;
  }

  try {
    responseData.data = (await cloneBlob.blob()) as R;
    return responseData;
  } catch {
    responseData.data = null;
  }

  try {
    responseData.data = (await cloneText.text()) as R;
    return responseData;
  } catch {
    responseData.data = null;
  }

  try {
    responseData.data = (await cloneArrayBuffer.arrayBuffer()) as R;
    return responseData;
  } catch {
    responseData.data = null;
  }

  try {
    responseData.data = (await cloneFormData.formData()) as R;
    return responseData;
  } catch {
    responseData.data = null;
  }

  try {
    responseData.data = (await cloneBytes.bytes()) as R;
    return responseData;
  } catch {
    responseData.data = null;
  }

  return responseData;
}
