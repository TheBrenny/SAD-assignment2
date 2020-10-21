INSERT INTO AttendanceRecord (student, recordDate, attendance) VALUES
    @{beginDupe}
    (${student}, DATE("${recordDate}"), ${attendance})
    @{endDupe};