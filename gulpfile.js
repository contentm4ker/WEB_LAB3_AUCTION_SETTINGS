const gulp = require("gulp4");
const less = require('gulp-less');
const rename = require('gulp-rename');
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const babel = require('gulp-babel');
const del = require('del');
const imagemin = require('gulp-imagemin');

const clean = () => {
    return del(['assets'])
};

gulp.task('clean', clean);

function styles() {
    return gulp.src('public/stylesheets/*.less')
        .pipe(less())
        .pipe(cleanCSS())
        .pipe(rename({
            suffix : '.min'
        }))
        .pipe(gulp.dest('assets/stylesheets/'));
}

function js() {
    return gulp.src('public/javascripts/*.js')
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(uglify())
        .pipe(rename({
            suffix : '.min'
        }))
        .pipe(gulp.dest('assets/javascripts/'));
}

function image () {
    return gulp.src('public/images/paintings/*.*')
        .pipe(imagemin())
        .pipe(rename({
            suffix : '.min'
        }))
        .pipe(gulp.dest('assets/img/'))
}

gulp.task('default', gulp.series(clean, gulp.parallel(styles, js, image)));