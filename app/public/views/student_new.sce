[[i= partials/header ]]

<div class="actionButtons">
    <div class="btn red" target="cancel">Cancel</div>
    <div class="btn" target="save">Save</div>
</div>

<div class="hr"></div>

<div class="studentBlock flex">
    [[c= components/student || fname="" lname="" studentID="" ]]
    <div class="studentInfo flex">
        <label for="studentID">Student ID</label>
        <input disabled id="studentID" placeholder="Student ID" type="text" class="" value="will be auto-generated">
        <!-- <div class="flex-br"></div> -->
        <label for="firstName">First Name</label>
        <input id="firstName" placeholder="First Name" type="text" class="" value="">
        <label for="lastName">Last Name</label>
        <input id="lastName" placeholder="Last Name" type="text" class="" value="">
        <label for="dob">Date of Birth</label>
        <input id="dob" placeholder="Date Of Birth" type="date" class="" value="">
        <!-- <input id="groupID" placeholder="Group" type="select" class="" value=""> -->
        <label for="groupID">Group</label>
        <select name="groupID" id="groupID" placeholder="Group">
            <option value="" disabled selected>Select a group</option>
            [[e= g in groups ]]
                <option value="[[g.groupID]]">[[g.groupName]]</option>
            [[?==]]
        </select>
    </div>
</div>

<script src="/assets/js/students.js"></script>

[[i= partials/footer ]]