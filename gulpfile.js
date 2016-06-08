var gulp = require('gulp');
var uglify = require('gulp-uglify');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var babel = require('gulp-babel');

gulp.task('default', ['es2015', 'sass', 'browser-sync']);

gulp.task('browser-sync', function() {
    browserSync.init({
        open: false,
        proxy: '192.168.33.10/project2'
    });

    // Watch Tasks
    gulp.watch('./src/**/*.js', ['es2015']);
    gulp.watch('./src/styles/**/*.scss', ['sass']);

    gulp.watch(['./build/**/*.*', 'index.html'])
        .on('change', browserSync.reload);
});

gulp.task('sass', function() {
    return gulp.src('./src/styles/**/*.scss')
        .pipe(sass({
            outputStyle: 'compressed'
        }).on('error', sass.logError))
        .pipe(gulp.dest('./build'));
});

gulp.task('uglify', function() {
    gulp.src('./src/*.js') // What files do we want gulp to consume?
        .pipe(uglify()) // Call the uglify function on these files
        .pipe(gulp.dest('./build')); // Where do we put the result?
});

gulp.task('es2015', () => {
    return gulp.src('./src/**/*.js')
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest('./build'));
});
