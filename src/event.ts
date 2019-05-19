export type Event<T extends object> = {
  id: string;
  version: number;
  timestamp: Date;
  userId: string;
  entityType: string;
  type: string;
  aggregateId: string;

  paylod: T;
};
