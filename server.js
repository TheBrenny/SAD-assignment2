/* 
 * The purpose of this file is to act as the entry point for the application.
 * 
 * Author: Jarod Brennfleck
 * 21 Sep 20
 */

console.log("Going to use express (maybe MetorJS) to serve up a simple app that renders using Scetch.");
console.log("Deploy to Heroku: https://devcenter.heroku.com/articles/getting-started-with-nodejs#prepare-the-app");

const serverInfo = {
    host: process.env.HOST || "localhost",
    port: process.env.PORT || 80
};

// Express related stuff
const path = require('path');
const express = require('express');
const scetch = require('scetch')();
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');

// Make the app
let app = express();
app.use(morgan('common', {
    stream: process.env.IS_VSCODE ? {
        write: console.log
    } : process.stdout
}));
app.use(helmet({
    contentSecurityPolicy: !process.env.GULPING
}));
app.use(cors());

let public = path.join(__dirname, "app", "public");

app.set('views', path.join(public, 'views'));
app.engine('sce', scetch.engine);
app.set('view engine', 'sce');

app.use("/assets", express.static(path.join(public, "assets")));
app.use(require('./app/public/routes'));
app.use('/api', require('./app/api/routes'));
app.use(require('./app/errorRouter'));

app.listen(serverInfo.port, serverInfo.host, () => {
    if (process.env.NODE_ENV === 'dev' && process.env.GUPLING == 'true') serverInfo.port = 81;
    console.log(`Server is listening at http://${serverInfo.host}:${serverInfo.port}...`);
});