import * as session from '../../es/session';
import {
  createTimeClock,
  setEmployee,
  timeClockAggregate,
  TimeClockAggregate,
  TimeClockEvents,
} from '../../domain/timeClock';

export function createTimeClockHandler(cmd) {
  session.add(
    createTimeClock(
      cmd.payload.id,
      cmd.payload.dateTime
      // cmd.employeeId
    )
  );
}

export function setEmployeeHandler(cmd) {
  const aggr = session.get<TimeClockAggregate, TimeClockEvents>(
    timeClockAggregate,
    cmd.payload.id
  );

  if (!aggr) {
    throw new Error('aggr not found');
  }

  session.add(setEmployee(aggr, cmd.payload.employeeId));
}
