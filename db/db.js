/*
 * The purpose of this file is to give access to a global singleton of a DB
 * instance. The idea is that when this module is required for the first time,
 * a DB object is created and stored in the global object. Any subsequent
 * requires will then return this global DB object.
 * 
 * Author: Jarod Brennfleck
 * 01 Oct 20
 */

const path = require('path');
let sqlite3 = require("sqlite3");
const sqlite = require("sqlite").open; // promise one
const fs = require('fs');

const dbFolder = path.join(__dirname);
const sqlFolder = path.join(dbFolder, "sql");
const templateFolder = path.join(dbFolder, "templates");

module.exports.sqlFolder = sqlFolder;
module.exports.sqlFromFile = function (filename) {
    filename = path.basename(filename, path.extname(filename)); // kill the file extension
    filename = path.join(sqlFolder, filename + ".sql"); // add our own!
    return stripUselessChars(fs.readFileSync(filename).toString());
};
module.exports.templateFromFile = function (filename, values) {
    filename = path.basename(filename, path.extname(filename)); // kill the file extension
    filename = path.join(templateFolder, filename + ".template.sql"); // add our own!
    let template = stripUselessChars(fs.readFileSync(filename).toString());

    if (!Array.isArray(values)) values = [values];

    let out = [];

    out.push(template.substring(0, template.indexOf("@{beginDupe}")));
    template = template.substring(template.indexOf("@{beginDupe}") + "@{beginDupe}".length);
    let dupeTemplate = template.substring(0, template.indexOf("@{endDupe}"));

    let dupeArr = [];
    Array.from(values).forEach(v => { // v is an object
        let dupe = dupeTemplate;
        for (let e of Object.entries(v)) {
            dupe = dupe.replaceAll("${" + e[0] + "}", e[1]);
        }
        dupeArr.push(dupe);
    });
    out.push(dupeArr.join(", "));


    out.push(template.substring(template.indexOf("@{endDupe}") + "@{endDupe}".length));

    return stripUselessChars(out.join(" "));
};

function stripUselessChars(data) {
    return data.replaceAll(/(\/\*.+?\*\/|^--.*?$)/gms, "").replaceAll(/\n\r/, " ").replaceAll(/\s+/, " ").trim();
}
// Returns a Promise!
// This should be used as require('./db').then(blah).blah...
module.exports = (function () {
    if (!global.hasOwnProperty('db')) {
        let dbTarget = "db.sqlite";
        if (!((process.env.NODE_ENV || "production") + "").startsWith("prod")) {
            sqlite3 = sqlite3.verbose();
            dbTarget = ["db.", process.env.NODE_ENV, ".sqlite"].join("");
        }
        global.db = sqlite({
            filename: path.join(__dirname, dbTarget),
            driver: sqlite3.Database,
        });

        // TODO: add the exports
        Object.assign(global.db, module.exports);
    }
    return global.db;
})();

let dbOps = ["close", "configure", "run", "get", "all", "each", "exec", "prepare"];
dbOps.forEach(op => {
    module.exports[op] = async function () {
        let theDB = (await global.db);
        return theDB[op].apply(theDB, arguments);
    };
});


// module.exports.exec = async function () {
//     let theDB = (await global.db);
//     return theDB.exec.apply(theDB, arguments);
// };

// module.exports.get = async function () {
//     let theDB = (await global.db);
//     return theDB.get.apply(theDB, arguments);
// };

// Documentation: https://npmjs.com/package/sqlite