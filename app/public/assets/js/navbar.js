/*
 * The purpose of this file is to register all the Navbar events.
 * 
 * Author: Jarod Brennfleck
 * 09 Oct 20
 */

(() => {
    $$(".navbarItem").forEach(n => n.addEventListener("click", (e) => {
        window.location.pathname = e.target.attributes.target.value.toLowerCase();
    }));
})();