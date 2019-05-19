import { Event } from "./event";

export type Aggregate<T, E = Event> = {
  getUncommittedChanges(): any;
  applyChange(event: {
    type: string;
    entityType: string;
    aggregateId: string;
    payload: Event["payload"];
  }): Aggregate<T, E>;
  loadFromHistory(events: any[]): Aggregate<T, E>;
} & { [P in keyof T]: T[P] };

export default function aggregate<T, E extends Event>(
  reducer: (t: Aggregate<T, E>, event: E) => Aggregate<T, E>
): Aggregate<T, E> {
  const uncommittedEvents: any = [];

  function applyChange(eventData: {
    type: string;
    entityType: string;
    aggregateId: string;
    payload: E["payload"];
  }) {
    const event = {
      ...eventData,
      id: Math.random().toString(),
      timestamp: new Date(),
      version: this.version ? (this.version as number) + 1 : 1
    };
    uncommittedEvents.push(event);

    return reducer(this, event as E);
  }

  function getUncommittedChanges() {
    return uncommittedEvents;
  }

  function loadFromHistory(events: any[]) {
    return events.reduce<Aggregate<T, E>>(
      (acc, cur) => reducer(acc, cur),
      this
    );
  }

  return {
    getUncommittedChanges,
    applyChange,
    loadFromHistory
  } as Aggregate<T, E>;
}
