/**
 * 시간 지연함수
 * @param timeout
 * @returns
 */
export const sleep = (timeout: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, timeout));
