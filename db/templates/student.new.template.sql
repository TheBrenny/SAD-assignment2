INSERT INTO Student (studentID, firstName, lastName, dob, groupID) VALUES
    @{beginDupe}
    (${studentID}, "${firstName}", "${lastName}", DATE("${dob}"), ${groupID})
    @{endDupe};