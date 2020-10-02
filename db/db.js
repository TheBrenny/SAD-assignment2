/*
 * The purpose of this file is to give access to a global singleton of a DB
 * instance. The idea is that when this module is required for the first time,
 * a DB object is created and stored in the global object. Any subsequent
 * requires will then return this global DB object.
 * 
 * Author: Jarod Brennfleck
 * 01 Oct 20
 */

module.exports = (function () {
    if (!global.hasOwnProperty('db')) {
        const path = require('path');
        const sqlite3 = require("sqlite3").verbose();
        const sqlite = require("sqlite").open;
        global.db = sqlite({
            filename: path.join(__dirname, "sql", "db.sqlite"),
            driver: sqlite3.Database,
        });
    }
    return global.db;
})();