/*
 * The purpose of this file is to register the gulp build/dev processes.
 * 
 * Author: Jarod Brennfleck
 * 23 Sep 20
 */

const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();
const nodemon = require('gulp-nodemon');

const host = "sadass";

gulp.task("sass", function () {
    return gulp.src("app/public/assets/scss/**/*.scss")
        .pipe(sass().on("error", sass.logError))
        .pipe(gulp.dest("app/public/assets/css/"))
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task("browserSync", function (cb) {
    return browserSync.init({
        proxy: `http://${host}/`,
        files: ["app/public/assets/**/*.*", "app/public/views/**/*.*"],
        excludeFileTypes: [".scss"],
        open: false,
        port: 81
    }, cb);
});

gulp.task("nodemon", function (cb) {
    var started = false;

    return nodemon({
        script: 'server.js',
        env: {
            "NODE_ENV": 'dev',
            "GULPING": true,
            "IS_VSCODE": true,
            "HOST": host,
            "PORT": 80
        },
    }).on('start', function () {
        // to avoid nodemon being started multiple times
        // thanks @matthisk
        if (!started) {
            started = true;
            console.log("Nodemon started.");
            cb();
        }
    });
});
gulp.task("watch", gulp.series("sass", function (cb) {
    gulp.watch("app/public/assets/scss/**/*.scss", gulp.series("sass"));
    cb();
}));

gulp.task("dev", gulp.series("nodemon", "browserSync", "watch"));
gulp.task("build", gulp.series("sass"));