@{beginDupe}
SELECT a.activityID, a.activityName, a.parentID, a.mandatory, c.completionDate
FROM Activity a
LEFT JOIN ActivityCompleted c
    ON a.activityID = c.activity
WHERE c.student = ${studentID}
    OR c.completionDate IS NULL;
@{endDupe}