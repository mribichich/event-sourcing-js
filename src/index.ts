import { createTimeClock, setEmployee } from "./command";
import { createTimeClockHandler, setEmployeeHandler } from "./handler";

// import {
//   createTimeClock,
//   setEmployee,
//   timeClockAggregate,
//   loadFromHistory
// } from "./timeClock";
import * as session from "./session";
import { timeClockAggregate } from "./timeClock";

// const trackedAggregates: any = [];

// function addToSession(entity) {
//   trackedAggregates.push(entity);
// }

// function repoSave(entity) {
//   const changes = entity.getUncommittedChanges();

//   console.log("repo save: " + changes);
// }

// let tc1 = createTimeClock(1, new Date());

// console.log(JSON.stringify(tc1));
// console.log(tc1.getUncommittedChanges());

// let tc2 = setEmployee(tc1, "e1");

// console.log(tc1 === tc2);
// console.log(JSON.stringify(tc2));
// console.log(tc2.getUncommittedChanges());

// const events = [
//   { type: "CREATE_TIMECLOCK", id: 1, dateTime: new Date() },
//   { type: "SET_EMPLOYEE_TIMECLOCK", employeeId: "e1" }
// ];

// const tca1 = loadFromHistory(events);

// console.log();
// console.log(JSON.stringify(tca1));
// console.log(tca1.getUncommittedChanges());

// const tca122 = session.get(timeClockAggregate, "1");

// console.log();
// console.log(JSON.stringify(tca122));
// console.log(tca122.getUncommittedChanges());

const cmd = createTimeClock("1", new Date());
createTimeClockHandler(cmd);

const cmd2 = createTimeClock("2", new Date());
createTimeClockHandler(cmd2);

session.commit();

setEmployeeHandler(setEmployee("2", "a1"));

session.commit();

console.log(session.get(timeClockAggregate, "1"));
console.log(session.get(timeClockAggregate, "2"));
