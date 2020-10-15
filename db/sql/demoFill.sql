-- Attendance;
-- ClassGroup;
-- Activity;
-- Student;
-- AttendanceRecord;
-- ActivityCompleted;

-- INSERT INTO ClassGroup (groupID, groupName) VALUES
  -- (0, "");

INSERT INTO Student (studentID, firstName, lastName, dob, groupID) VALUES
  (1, "Jarod", "Brennfleck", DATE("1999-02-01"), -1),
  (2, "Josie", "Curtis", DATE("1999-02-02"), -1),
  (3, "Jack", "Millar", DATE("1999-02-03"), -1),
  (4, "Kat", "Burnett", DATE("1999-02-04"), -1);

INSERT INTO Activity (activityID, parentID, activityName) VALUES
  (1, null, "Camping"),
    (2, 1, "Survival"),
      (3, 2, "Catching Food"),
      (4, 2, "Cooking Food"),
      (5, 2, "Shelter Making"),
      (6, 2, "Campfires"),
    (7, 1, "Fishing"),
      (8, 7, "Lures"),
      (9, 7, "Rods"),
      (10, 7, "Techniques"),
    (11, 1, "Shooting"),
      (12, 11, "Safety"),
      (13, 12, "Weapon Parts"),
      (14, 12, "Marksmanship");

  -- (x, null, "History"),
  --   (x, x, "Modern History"),
  --   (x, x, "Ancient History"),
  -- (x, null, "Technology"),
  --   (x, x, "");