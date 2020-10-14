/*
 * The purpose of this file is to create all the tables required for the app.
 * 
 * Author: Jarod Brennfleck
 * 01 Oct 20
 */

CREATE TABLE Attendance (
  attendID INTEGER NOT NULL,
  attendName VARCHAR(20) NOT NULL,
  PRIMARY KEY (attendID)
);

INSERT INTO Attendance (attendID, attendName) VALUES
  (0, "Present"),
  (1, "Absent"),
  (2, "Sick");

CREATE TABLE ClassGroup (
  groupID INTEGER NOT NULL,
  groupName VARCHAR(20) NOT NULL,
  PRIMARY KEY (groupID)
);

CREATE TABLE Exam (
  examID INTEGER NOT NULL,
  parentID INTEGER,
  examName VARCHAR(50) NOT NULL UNIQUE,
  PRIMARY KEY (examID),
  FOREIGN KEY (parentID) REFERENCES Exam (examID)
);

CREATE TABLE Student (
  studentID INTEGER NOT NULL,
  firstName VARCHAR(20) NOT NULL,
  lastName VARCHAR(60) NOT NULL,
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
CREATE TABLE ExamCompleted (
  student INTEGER NOT NULL,
  exam INTEGER NOT NULL,
  completionDate DATE NOT NULL,
  PRIMARY KEY (student, exam),
  FOREIGN KEY (student) REFERENCES Student (studentID),
  FOREIGN KEY (exam) REFERENCES Exam (examID)
);