/*
 * The purpose of this file is to handle when students are added, deleted, clicked
 * on, etc.
 * 
 * Author: Jarod Brennfleck
 * 15 Oct 20
 */
(() => {
    let searchBox = $('input.searchbox');

    $$("app .student[target]").forEach(el => el.addEventListener("click", (e) => {
        window.location.pathname = "/students/" + e.target.closest(".student[target]").attributes.target.value.toLowerCase();
    }));

    $('.btn[target="search"]').addEventListener("click", (e) => {
        let query = searchBox.value;
        if (query !== "") window.location.pathname = "/students/search/" + query;
    });

    $('.btn[target="new"]').addEventListener("click", (e) => {
        window.location.pathname = "/students/new";
    });
})();