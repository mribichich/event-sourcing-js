import { Aggregate } from "./aggregate";
import * as repository from "./repository";
import { Event } from "./event";

const untrackEntities: Aggregate<any, any>[] = [];

export function get<T, E extends Event>(
  aggregate: () => Aggregate<T, E>,
  aggregateId: string,
  expectedVersion?: number
) {
  return repository.get<T, E>(aggregate, aggregateId);
}

export function add(aggregate) {
  // console.log("session adding: ", aggregate);

  untrackEntities.push(aggregate);
}

export function commit() {
  for (const entity of untrackEntities) {
    for (const event of entity.getUncommittedChanges()) {
      repository.add(event);
    }
  }
}
