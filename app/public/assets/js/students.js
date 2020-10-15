/*
 * The purpose of this file is to handle when students are added, deleted, clicked
 * on, etc.
 * 
 * Author: Jarod Brennfleck
 * 15 Oct 20
 */
(() => {
    $$(".student[target]").forEach(el => el.addEventListener("click", (e) => {
        window.location.pathname = "/students/" + e.target.closest(".student[target]").attributes.target.value.toLowerCase();
    }));
})();