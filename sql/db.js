module.exports = async function () {
    if (!global.hasOwnProperty('db')) {
        const path = require('path');
        const sqlite3 = require("sqlite3").verbose();
        const sqlite = require("sqlite").open;
        global.db = sqlite({
            filename: path.join(__dirname, "db.sqlite"),
            driver: sqlite3.Database,
        });
    }
    return global.db;
};