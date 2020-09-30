module.exports = {
    morgan: {
        stream: process.env.IS_VSCODE ? {
            write: console.log
        } : process.stdout
    },
    helmet: {}
};

module.exports.helmet = process.env.GULPING ? {} : {
    contentSecurityPolicy: false
};