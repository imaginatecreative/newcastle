var gulp = require('gulp');
    sass = require('gulp-sass');
    plumber = require('gulp-plumber');
    prefix = require('gulp-autoprefixer');
    cssmin      = require('gulp-cssnano');
    rename      = require('gulp-rename');
    notify      = require('gulp-notify');



var onError = function (err) {
    notify.onError({
        title: "Gulp",
        subtitle: "Failure!",
        message: "Error: <%= error.message %>",
        sound: "Basso"
    })(err);
    this.emit('end');
};

var sassOptions = {
    outputStyle: 'expanded'
};


var prefixerOptions = {
    browsers: ['last 2 versions']
};


gulp.task('sass', function () {
    return gulp.src('scss/main.scss')
        .pipe(plumber({errorHandler: onError}))
        .pipe(sass(sassOptions)) // Converts Sass to CSS with gulp-sass
        .pipe(prefix(prefixerOptions))
        .pipe(cssmin())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('css'))
});