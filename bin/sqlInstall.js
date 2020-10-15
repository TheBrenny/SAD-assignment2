/*
 * The purpose of this file is to clean and install the database when `npm install` is conducted.
 * 
 * Author: Jarod Brennfleck
 * 01 Oct 20
 */

// Delete DB File

// Use sqlite module to run the "install.sql" file into memory and save to a new DB.
(async () => {
    require("../util_and_polyfill");
    const db = require("../db/db");

    db.exec(db.sqlFromFile("clean"));
    db.exec(db.sqlFromFile("install"));
})();