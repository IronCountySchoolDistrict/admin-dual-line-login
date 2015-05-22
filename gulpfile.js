var gulp = require("gulp");
var plugins = require("gulp-load-plugins")();
plugins.del = require("del");


require("../ps-tasks/tasks")(gulp, plugins);