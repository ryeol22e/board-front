/**
 * generate uuid
 * @returns
 */
export const uuid = () => {
  if (typeof window !== 'undefined') {
    return crypto.randomUUID();
  }
  // node version < 19
  // return (await import('node:crypto')).randomUUID();
  // node version >= 19
  return global.crypto.randomUUID();
};
