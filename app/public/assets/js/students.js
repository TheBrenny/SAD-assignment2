/*
 * The purpose of this file is to handle when students are added, deleted, clicked
 * on, etc.
 * 
 * Author: Jarod Brennfleck
 * 15 Oct 20
 */
(async () => {
    let searchBox = $('input.searchbox');

    $$("app .student.clickable[target]").forEach(el => el.addEventListener("click", (e) => {
        window.location.pathname = "/students/" + e.target.closest(".student[target]").attributes.target.value.toLowerCase();
    }));

    // Search Button
    try {
        $('.btn[target="search"]').addEventListener("click", (e) => {
            let query = searchBox.value;
            if (query !== "") window.location.pathname = "/students/search/" + query;
        });
    } catch (e) {}

    // New Student
    try {
        $('.btn[target="new"]').addEventListener("click", (e) => {
            window.location.pathname = "/students/new";
        });
    } catch (e) {}

    // Cancel Button
    try {
        $('.btn[target="cancel"]').addEventListener("click", (e) => {
            // cancel any outgoing request(s)
            window.location.pathname = "/students";
        });
    } catch (e) {}

    // Save Button
    try {
        $('.btn[target="save"]').addEventListener("click", async (e) => {
            // block the save button
            // VALIDATE DATA
            //  - Fetch for ID, count responses NOT ANY MORE!
            //  - Validate special characters
            // window.location.pathname = "/students/new";
            if (!!e.target.getAttribute("disabled")) return;

            e.target.setAttribute("disabled", true);

            let fn = $("#firstName").value;
            let ln = $("#lastName").value;
            let dob = $("#dob").value;
            let group = $("#groupID").value;

            let resume = null;
            if (fn === "") resume = "First name";
            else if (/([^\w \-',]|[_\d])/.test(fn)) resume = "First name";
            else if (ln === "") resume = "Last name";
            else if (/([^\w \-',]|[_\d])/.test(ln)) resume = "Last name";
            else if (dob === "") resume = "Date of birth";
            else if (dob.search(/\d{4}-\d\d-\d\d/) != 0) resume = "Date of birth";
            else if (dob.length != "0000-00-00".length) resume = "Date of birth";
            else if (group.search(/-?\d+/) != 0) resume = "Group";

            if (resume === null) {
                let res = await fetch("/api/students/new", {
                    method: "POST",
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        firstName: fn,
                        lastName: ln,
                        dob: dob,
                        groupID: group,
                    })
                });

                if (res.ok && (await res.json()).success === true) {
                    window.location.pathname = "/students/";
                    return;
                } else console.error((await res.text()));
            } else console.error(resume);
            e.target.removeAttribute("disabled");
        });
    } catch (e) {}
})();