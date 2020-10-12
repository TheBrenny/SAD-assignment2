/*
 * The purpose of this file is to empty the database by dropping all records. This is run during npm install.
 * 
 * Author: Jarod Brennfleck
 * 01 Oct 20
 */

-- OLD WAY:
-- DROP TABLE IF EXISTS Attendance;
-- DROP TABLE IF EXISTS ClassGroup;
-- DROP TABLE IF EXISTS Exam;
-- DROP TABLE IF EXISTS Student;
-- DROP TABLE IF EXISTS AttendanceRecord;
-- DROP TABLE IF EXISTS ExamCompleted;

BEGIN TRANSACTION;

PRAGMA writable_schema = 1;
DELETE FROM sqlite_master where type in ('table', 'index', 'trigger');
PRAGMA writable_schema = 0;
VACUUM;
PRAGMA INTEGRITY_CHECK;

COMMIT;