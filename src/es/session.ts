import { Aggregate } from "./aggregate";
import * as repository from "./repository";

const untrackEntities: Aggregate<any>[] = [];

export function get<T>(
  aggregate: () => Aggregate<T>,
  aggregateId: string,
  expectedVersion?: number
) {
  return repository.get<T>(aggregate, aggregateId);
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
