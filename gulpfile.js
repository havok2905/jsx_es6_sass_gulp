var gulp       = require('gulp');
var browserify = require('browserify');
var babelify   = require('babelify');
var source     = require('vinyl-source-stream');
var sass       = require('gulp-sass');

gulp.task('sass', function() {
  gulp.src('./sass/main.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(sass({outputStyle: 'compressed'}))
    .pipe(gulp.dest('.'));
});

gulp.task('jsx', function () {
  return browserify({entries: './app/app.jsx', extensions: ['.jsx'], debug: true})
    .transform(babelify)
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('.'));
});

gulp.task('watch', ['jsx', 'sass'], function () {
  gulp.watch('./app/**/*.jsx', ['jsx']);
  gulp.watch('./sass/**/*.scss', ['sass']);
});

gulp.task('default', ['watch']);

