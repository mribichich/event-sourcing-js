import { Aggregate } from "./aggregate";
import * as eventStore from "./eventStore";
import { Event } from "./event";
import { isEmpty } from "ramda";

export function get<T>(
  aggregate: () => Aggregate<T>,
  aggregateId: string
): Aggregate<T> | undefined {
  var events = eventStore.get(aggregateId, -1);

  if (isEmpty(events)) {
    return undefined;
  }

  return aggregate().loadFromHistory(events);
}

export async function add(event: Event<{}>) {
  // console.log("repo adding: ", event);

  await eventStore.add(event);
}
