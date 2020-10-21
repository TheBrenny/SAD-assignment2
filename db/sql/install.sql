/*
 * The purpose of this file is to create all the tables required for the app.
 * 
 * Author: Jarod Brennfleck
 * 01 Oct 20
 */

CREATE TABLE Attendance (
  attendID INTEGER NOT NULL,
  attendName TEXT NOT NULL,
  PRIMARY KEY (attendID)
);

INSERT INTO Attendance (attendID, attendName) VALUES
  (1, "Present"),
  (2, "Absent"),
  (3, "Sick");

CREATE TABLE ClassGroup (
  groupID INTEGER NOT NULL,
  groupName TEXT NOT NULL,
  PRIMARY KEY (groupID)
);

INSERT INTO ClassGroup (groupID, groupName) VALUES
  (-1, "Groupless");

CREATE TABLE Activity (
  activityID INTEGER NOT NULL,
  parentID INTEGER,
  activityName TEXT NOT NULL,
  mandatory INTEGER NOT NULL,
  PRIMARY KEY (activityID),
  FOREIGN KEY (parentID) REFERENCES Activity (activityID)
);

CREATE TABLE Student (
  studentID INTEGER NOT NULL,
  firstName TEXT NOT NULL,
  lastName TEXT NOT NULL,
  dob DATE NOT NULL,
  groupID INTEGER NOT NULL,
  PRIMARY KEY (studentID),
  FOREIGN KEY (groupID) REFERENCES ClassGroup (groupID)
);

CREATE TABLE AttendanceRecord (
  student INTEGER NOT NULL,
  recordDate DATE NOT NULL,
  attendance INTEGER NOT NULL,
  PRIMARY KEY (student, recordDate),
  FOREIGN KEY (student) REFERENCES Student(studentID),
  FOREIGN KEY (attendance) REFERENCES Attendance(attendID)
);
CREATE TABLE ActivityCompleted (
  student INTEGER NOT NULL,
  activity INTEGER NOT NULL,
  completionDate DATE NOT NULL,
  PRIMARY KEY (student, activity),
  FOREIGN KEY (student) REFERENCES Student (studentID),
  FOREIGN KEY (activity) REFERENCES Activity (activityID)
);