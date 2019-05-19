import { Aggregate } from "./aggregate";
import * as eventStore from "./eventStore";
import { Event } from "./event";
import { isEmpty } from "ramda";

export function get<T, E extends Event>(
  aggregate: () => Aggregate<T, E>,
  aggregateId: string
): Aggregate<T, E> | undefined {
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
