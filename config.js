/*
 * The purpose of this file is to house all config options. This is done
 * programmatically and is chosen instead of a .env file because of that
 * reason.
 * 
 * Author: Jarod Brennfleck
 * 30 Sep 20
 */

const path = require('path');

module.exports = {
    morgan: {
        stream: process.env.IS_VSCODE ? {
            write: console.log
        } : process.stdout
    },
    helmet: {}
};

module.exports.helmet = !process.env.GULPING ? {} : {
    contentSecurityPolicy: false
};

module.exports.serverInfo = {
    host: process.env.HOST || "localhost",
    port: process.env.PORT || 80
};

const dbTarget = () => {
    let nodeEnv = process.env.NODE_ENV || "production";
    let target = [
        "db",
        nodeEnv.startsWith("prod") ? "" : "." + nodeEnv,
        ".sqlite"
    ];
    return path.join(__dirname, "db", target.join(""));
};

Object.defineProperty(module.exports, "dbTarget", {
    get: () => dbTarget(process.env)
});