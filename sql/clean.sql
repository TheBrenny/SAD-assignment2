-- There's probably a better way to empty the DB. This was done in a rush.
/*
 * The purpose of this file is to empty the database by dropping all records. This is run during npm install.
 * 
 * Author: Jarod Brennfleck
 * 01 Oct 20
 */


DROP TABLE IF EXISTS Attendance;
DROP TABLE IF EXISTS ClassGroup;
DROP TABLE IF EXISTS Exam;
DROP TABLE IF EXISTS Student;
DROP TABLE IF EXISTS AttendanceRecord;
DROP TABLE IF EXISTS ExamCompleted;