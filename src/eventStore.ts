import { Event } from "./event";

const events: any[] = [
  // {
  //   id: "1",
  //   aggregateId: "1",
  //   version: 0,
  //   type: "CREATE_TIMECLOCK",
  //   dateTime: new Date()
  // },
  // {
  //   id: "2",
  //   aggregateId: "2",
  //   version: 0,
  //   type: "CREATE_TIMECLOCK",
  //   dateTime: new Date()
  // },
  // {
  //   id: "3",
  //   aggregateId: "3",
  //   version: 0,
  //   type: "CREATE_TIMECLOCK",
  //   dateTime: new Date()
  // },
  // {
  //   id: "6",
  //   aggregateId: "1",
  //   version: 1,
  //   type: "SET_NAME_TIMECLOCK",
  //   name: "qwe name"
  // },
  // { id: "7", aggregateId: "2", version: 1, name: "qwe" },
  // {
  //   id: "8",
  //   aggregateId: "1",
  //   version: 2,
  //   type: "SET_EMPLOYEE_TIMECLOCK",
  //   employeeId: "qwe employeeId"
  // },
  // { id: "9", aggregateId: "4", version: 0, name: "qwe" }
];

export function get<T extends Event<T>>(
  aggregateId: string,
  fromVersion: number
): T[] {
  return (events as any[]).filter(
    f => f.aggregateId === aggregateId && f.version >= fromVersion
  );
}

export function add<T extends {}>(event: Event<T>) {
  // console.log("event store adding: ", event);

  events.push(event);
}
