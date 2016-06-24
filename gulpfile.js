var gulp = require('gulp');
var uglify = require('gulp-uglify');
var jshint = require("gulp-jshint");


gulp.task("hint", function() {
    return gulp.src("./src/aztec.js")
        .pipe(jshint())
        .pipe(jshint.reporter("default"))
        .pipe(jshint.reporter("fail"));
});

gulp.task("buildMinified", function() {
	return gulp.src("./src/aztec.js")
        .pipe(uglify())
        .pipe(gulp.dest("./dist/minified/"));
});

gulp.task("buildNormal", function() {
	return gulp.src("./src/aztec.js")
        .pipe(gulp.dest("./dist/normal/"));
});

gulp.task("default",["hint", "buildMinified", "buildNormal"]);