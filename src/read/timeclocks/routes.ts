import express from 'express';
import {
  createTimeClockCommand,
  setEmployeeCommand,
} from '../../write/timeclocks/command';
import {
  createTimeClockHandler,
  setEmployeeHandler,
} from '../../write/timeclocks/handler';
import * as session from '../../es/session';
import { timeClockAggregate } from '../../domain/timeClock';

const cmd = createTimeClockCommand('1', new Date());
createTimeClockHandler(cmd);

const cmd2 = createTimeClockCommand('2', new Date());
createTimeClockHandler(cmd2);

session.commit();

setEmployeeHandler(setEmployeeCommand('2', 'a1'));

session.commit();

console.log(session.get(timeClockAggregate, '1'));
console.log(session.get(timeClockAggregate, '2'));

var router = express.Router();

router.get('/:id', function(req, res) {
  const { id } = req.params;

  res.json(session.get(timeClockAggregate, id));
});

router.get('/', function(req, res) {
  res.json({});
});

export default router;
