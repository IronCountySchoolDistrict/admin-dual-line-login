var gulp = require("gulp");
var zip = require("gulp-zip");
var sftp = require("gulp-sftp");
var del = require("del");
var debug = require("gulp-debug");
var watch = require("gulp-watch");
var credentials = require(".././deploy-credentials.json");

// No image server
    gulp.task("build-plugin", function() {
    return gulp.src(["plugin/**", "plugin.xml"])
        .pipe(gulp.dest("dist"));
});

gulp.task("build-src", ["build-plugin"], function() {
    return gulp.src("src/**")
        .pipe(gulp.dest("dist/web_root"));
});

gulp.task("zip", ["build-src"], function() {
    return gulp.src("dist")
        .pipe(zip("plugin.zip"))
        .pipe(gulp.dest("dist"));
});

gulp.task("clean", ["zip"], function() {
    del(["dist/*", "!dist/*.zip"]);
});

gulp.task("build-no-img", ["build-plugin", "build-src", "zip", "clean"]);

gulp.task("test-deploy", function() {
    return gulp.src("src/**")
        .pipe(sftp(credentials.test));
});

gulp.task("watch-deploy", function() {
    return gulp.src("src/**")
        .pipe(watch("src/**"))
        .pipe(sftp(credentials.test));
});

gulp.task("build", function() {
    return gulp.src("plugin/**")
        .pipe(zip("plugin.zip"))
        .pipe(gulp.dest("dist"));
});