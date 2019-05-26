import express from 'express';
import {
  createTimeClockHandler,
  setEmployeeHandler,
} from '../../write/timeclocks/handler';
import * as session from '../../es/session';
import uuid from 'uuid/v4';
import { createTimeClockCommand } from './command';

var router = express.Router();

router.post('/', function(req, res) {
  const { dateTime } = req.body;

  const id = uuid();

  const cmd = createTimeClockCommand(id, dateTime);
  createTimeClockHandler(cmd);

  session.commit();

  res.json({ id });
});

export default router;
