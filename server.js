/* 
 * The purpose of this file is to act as the entry point for the application.
 * 
 * Author: Jarod Brennfleck
 * 21 Sep 20
 */

console.log("Going to use express (maybe MetorJS) to serve up a simple app that renders using Scetch.");
console.log("Deploy to Heroku: https://devcenter.heroku.com/articles/getting-started-with-nodejs#prepare-the-app");

const HOST = process.env.HOST || "sadass";
const PORT = process.env.PORT || 80;

const express = require('express');
const scetch = require('scetch');

let app = express();
app.set('views', 'views'); // registers './views' as the folder holding all the scetch template files
app.engine('sce', scetch.engine); // 'sce' registers the file extension, scetch.engine is the actual engine!
app.set('view engine', 'sce'); // tells express to look for '*.sce' files when rendering

app.get('/*', (req,res) => {
    res.render('home', {
        url: req.url,
        time: new Date().toLocaleString()
    });
});
