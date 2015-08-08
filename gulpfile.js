var gulp = require('gulp');
var browserSync = require('browser-sync');
var less = require('gulp-less');
var sourcemaps = require('gulp-sourcemaps');
var concat = require('gulp-concat');
var del = require('del');

gulp.task('default', ['clean'], function () {
    gulp.start('less', 'js');

    browserSync({
        server: {
            baseDir: 'public'
        }
    });

    gulp.watch('less/**/*.less', ['less']);
    gulp.watch('js/**/*.js', ['js']);
});

gulp.task('less', function () {
    return gulp.src('./less/**/*.less')
        .pipe(sourcemaps.init())
        .pipe(less({
            filename: 'style.css'
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./public'))
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task('js', function () {
    return gulp.src('src/scripts/**/*.js')
        .pipe(concat('script.js'))
        .pipe(sourcemaps.init({
            loadMaps: true
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./public'))
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task('clean', function () {
    del(['public/style.css', 'public/script.js']);
});

//gulp.task('images', function () {
//    return gulp.src('src/images/**/*')
//        .pipe(cache(imagemin({
//            optimizationLevel: 5,
//            progressive: true,
//            interlaced: true
//        })))
//        .pipe(gulp.dest('dist/assets/img'))
//        .pipe(notify({
//            message: 'Images task complete'
//        }));
//});
