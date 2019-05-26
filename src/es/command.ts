export type Command<T> = {
  type: string;
  payload: T;
};
