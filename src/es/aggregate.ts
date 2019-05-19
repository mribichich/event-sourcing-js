export type Aggregate<T> = {
  getUncommittedChanges(): any;
  applyChange<K>(event: {
    type: string;
    entityType: string;
    aggregateId: string;
    payload: K;
  }): Aggregate<T>;
  loadFromHistory(events: any[]): Aggregate<T>;
} & { [P in keyof T]: T[P] };

export default function aggregate<T>(
  reducer: (t: Aggregate<T>, event) => Aggregate<T>
): Aggregate<T> {
  const uncommittedEvents: any = [];

  function applyChange<K>(eventData: {
    type: string;
    entityType: string;
    aggregateId: string;
    payload: K;
  }) {
    const event = {
      ...eventData,
      id: Math.random(),
      timestamp: new Date(),
      version: this.version ? this.version + 1 : 1
    };
    uncommittedEvents.push(event);

    // console.log("applyChange event: ", event);

    return reducer(this, event);
  }

  function getUncommittedChanges() {
    return uncommittedEvents;
  }

  function loadFromHistory(events: any[]) {
    return events.reduce<Aggregate<T>>((acc, cur) => reducer(acc, cur), this);
  }

  return {
    getUncommittedChanges,
    applyChange,
    loadFromHistory
  } as Aggregate<T>;
}
