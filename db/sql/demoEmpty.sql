-- Attendance;
-- ClassGroup;
-- Exam;
-- Student;
-- AttendanceRecord;
-- ExamCompleted;

DELETE FROM Student;
DELETE FROM ClassGroup WHERE groupID != -1;
DELETE FROM Activity;
DELETE FROM AttendanceRecord;
DELETE FROM ActivityCompleted;