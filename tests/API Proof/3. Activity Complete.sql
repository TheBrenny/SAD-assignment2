-- SQLite
SELECT * FROM (
    SELECT a.activityID, a.activityName, a.parentID, a.mandatory, c.completionDate
    FROM Activity a
    LEFT JOIN ActivityCompleted c
        ON a.activityID = c.activity
    WHERE c.student = 1 OR c.completionDate IS NULL
)
WHERE activityID = 1;