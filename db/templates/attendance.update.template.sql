@{beginDupe}
UPDATE AttendanceRecord SET
    attendance = ${attendance}
WHERE student = ${student} AND recordDate = ${recordDate};
@{endDupe}