/*
 * The purpose of this file is to house all config options. This is done
 * programmatically and is chosen instead of a .env file because of that
 * reason.
 * 
 * Author: Jarod Brennfleck
 * 30 Sep 20
 */

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