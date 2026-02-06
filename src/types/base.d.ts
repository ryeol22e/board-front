export type ChildrenType = {
  children: React.ReactNode;
};

export type UserAgentType = {
  isBot: boolean;
  ua: string;
  browser: {
    name?: string;
    version?: string;
    major?: string;
  };
  device: {
    model?: string;
    type?: string;
    vendor?: string;
  };
  engine: {
    name?: string;
    version?: string;
  };
  os: {
    name?: string;
    version?: string;
  };
  cpu: {
    architecture?: string;
  };
};

export type ResponseApi<T> = {
  status: number;
  message: string;
  data: T | null;
};

export type ReducerActionType<T = { [key: string]: unknown }> = {
  [key in keyof T]: T[key] extends undefined
    ? { type: key }
    : {
        type: key;
        payload: T[key];
      };
}[keyof T];
