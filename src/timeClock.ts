import aggregate, { Aggregate } from "./es/aggregate";

type TimeClock = {
  id: string;
  dateTime: Date;
  employeeId?: string;
};

export type TimeClockAggregate = Aggregate<TimeClock>;

function reducer(entity: TimeClockAggregate, event): TimeClockAggregate {
  switch (event.type) {
    case "TIMECLOCK_CREATED":
      const x = Object.assign({}, entity, {
        id: event.aggregateId,
        dateTime: event.payload.dateTime,
        version: event.version
      });
      return x;

    case "SET_NAME_TIMECLOCK":
      return Object.assign({}, entity, { name: event.name });

    case "EMPLOYEE_SET_TO_TIMECLOCK":
      return Object.assign({}, entity, {
        employeeId: event.payload.employeeId,
        version: event.version
      });

    default:
      throw "unknown event type";
  }
}

export const timeClockAggregate = () => aggregate(reducer);

export function loadFromHistory(events: any[]) {
  return events.reduce<TimeClockAggregate>(
    (acc, cur) => reducer(acc, cur),
    timeClockAggregate() as any
  );
}

export function createTimeClock(
  id: string,
  //    userId:string,
  dateTime: Date
): TimeClockAggregate {
  const aggr = timeClockAggregate();

  return aggr.applyChange({
    type: "TIMECLOCK_CREATED",
    entityType: "TIMECLOCK",
    aggregateId: id,
    payload: { dateTime }
  });
}

export function setEmployee(entity: TimeClockAggregate, employeeId: string) {
  return entity.applyChange({
    type: "EMPLOYEE_SET_TO_TIMECLOCK",
    entityType: "TIMECLOCK",
    aggregateId: entity.id,
    payload: { employeeId }
  });
}
