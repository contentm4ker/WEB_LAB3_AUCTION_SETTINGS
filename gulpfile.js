const gulp = require("gulp4");
const less = require('gulp-less');
const rename = require('gulp-rename');
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const babel = require('gulp-babel');
const imagemin = require('gulp-imagemin');
const del = require('del');

const clean = () => {
    return del(['assets'])
};

function styles() {
    return gulp.src('public/stylesheets/*.less')
        .pipe(less())
        .pipe(cleanCSS())
        .pipe(rename({
            basename: 'main',
            suffix : '.min'
        }))
        .pipe(gulp.dest('assets/stylesheet/'));
}

function js() {
    return gulp.src('static/js/*.js')
        .pipe(babel({
            presets : ['env']
        }))
        .pipe(uglify())
        .pipe(rename({
            basename: 'main',
            suffix : 'min'
        }))
        .pipe(gulp.dest('assets/javascript/'))
}

function img () {
    return gulp.src('static/img/*.*')
        .pipe(imagemin())
        .pipe(rename({
            basename: 'main',
            suffix : 'min'
        }))
        .pipe(gulp.dest('assets/images/'))
}

gulp.task('default', gulp.series(clean, gulp.parallel(styles , js, img)));