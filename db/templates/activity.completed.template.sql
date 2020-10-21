INSERT INTO ActivityCompleted (student, activity, completionDate) VALUES
    @{beginDupe}
    (${studentID}, ${activityID}, DATE("${completionDate}"))
    @{endDupe};