import aggregate, { Aggregate } from '../es/aggregate';
import { Event } from '../es/event';

const ENTITY_TYPE = 'TIMECLOCK';
type ENTITY_TYPE = 'TIMECLOCK';

type TimeClock = {
  id: string;
  dateTime: Date;
  employeeId?: string;
};

export type TimeClockEvent<T> = Event<T> & {
  entityType: ENTITY_TYPE;
};

export type TimeClockCreatedEvent = TimeClockEvent<{ dateTime: Date }> & {
  type: 'TIMECLOCK_CREATED';
};

export type EmployeeSetToTimeClockEvent = TimeClockEvent<{
  employeeId: string;
}> & {
  type: 'EMPLOYEE_SET_TO_TIMECLOCK';
};

export type TimeClockEvents =
  | TimeClockCreatedEvent
  | EmployeeSetToTimeClockEvent;

export type TimeClockAggregate = Aggregate<TimeClock, TimeClockEvents>;

function reducer(
  entity: TimeClockAggregate,
  event: TimeClockEvents
): TimeClockAggregate {
  switch (event.type) {
    case 'TIMECLOCK_CREATED':
      const x = Object.assign({}, entity, {
        id: event.aggregateId,
        dateTime: event.payload.dateTime,
        version: event.version,
      });
      return x;

    case 'EMPLOYEE_SET_TO_TIMECLOCK':
      return Object.assign({}, entity, {
        employeeId: event.payload.employeeId,
        version: event.version,
      });

    default:
      throw 'unknown event type';
  }
}

export const timeClockAggregate = () => aggregate(reducer);

export function loadFromHistory(events: TimeClockEvents[]) {
  return events.reduce<TimeClockAggregate>(
    (acc, cur) => reducer(acc, cur),
    timeClockAggregate()
  );
}

export function createTimeClock(
  id: string,
  // userId: string,
  dateTime: Date
): TimeClockAggregate {
  const aggr = timeClockAggregate();

  return aggr.applyChange({
    type: 'TIMECLOCK_CREATED',
    entityType: ENTITY_TYPE,
    aggregateId: id,
    payload: { dateTime },
  });
}

export function setEmployee(entity: TimeClockAggregate, employeeId: string) {
  return entity.applyChange({
    type: 'EMPLOYEE_SET_TO_TIMECLOCK',
    entityType: ENTITY_TYPE,
    aggregateId: entity.id,
    payload: { employeeId },
  });
}
