<div class="flex navbar">
    <div class="navbarItem
    [[?= page.toLowerCase() == 'home' || page == '' ]]
    active
    [[?==]]
    " target="Home">Home</div>
    <div class="navbarItem
    [[?= page.toLowerCase() == 'students' ]]
    active
    [[?==]]
    " target="Students">Students</div>
    <div class="navbarItem
    [[?= page.toLowerCase() == 'attendance' ]]
    active
    [[?==]]
    " target="Attendance">Attendance</div>
    <div class="navbarItem
    [[?= page.toLowerCase() == 'activities' ]]
    active
    [[?==]]
    " target="Activities">Activities</div>
    <div class="navbarItem
    [[?= page.toLowerCase() == 'planner' ]]
    active
    [[?==]]
    " target="Planner">Planner</div>
</div>