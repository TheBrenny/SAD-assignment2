[[i= partials/header ]]

[[c= components/student || fname=student.firstName lname=student.lastName studentID=student.studentID ]]

<div class="hr"></div>

[[?= badges.length > 0]]
    [[e= badge in badges ]]
        [[c= components/badge || sID=student.studentID bID=badge.badgeID bname=badge.badgeName ]]
    [[?==]]
[[?==]]

[[i= partials/footer ]]