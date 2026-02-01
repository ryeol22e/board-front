export const isEmpty = <T>(data: T): data is T => {
  const type = typeof data;

  if (!data) {
    return true;
  }

  switch (type) {
    case 'string': {
      if ((data as string).replaceAll(/\s|\t|\r|\n/g, '').length === 0) {
        return true;
      }

      break;
    }
    case 'object': {
      if (Object.keys(data).length === 0) {
        return true;
      }

      break;
    }
    default:
      throw new Error("can't check type.");
  }

  return false;
};
