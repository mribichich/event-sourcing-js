export function createTimeClockCommand(
  id: string,
  dateTime: Date
  //   employeeId?: string
) {
  return {
    type: 'CREATE_TIMECLOCK',
    payload: {
      id,
      dateTime,
    },
  };
}
export function setEmployeeCommand(id: string, employeeId: string) {
  return {
    type: 'SET_EMPLOYEE_TO_TIMECLOCK',
    payload: {
      id,
      employeeId,
    },
  };
}
