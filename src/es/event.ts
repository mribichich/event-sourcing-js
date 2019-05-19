export type Event<T = object> = {
  id: string;
  version: number;
  timestamp: Date;
  userId?: string;
  entityType: string;
  type: string;
  aggregateId: string;

  payload: T;
};
