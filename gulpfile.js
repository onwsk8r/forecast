var gulp = require('gulp');
var browserSync = require('browser-sync');
var less = require('gulp-less');
var sourcemaps = require('gulp-sourcemaps');
var concat = require('gulp-concat');
var del = require('del');
var changed = require('gulp-changed');
var order = require('gulp-order');

gulp.task('default', ['clean'], function () {
    gulp.start('less', 'js', 'partial');

    browserSync({
        server: {
            baseDir: 'public'
        }
    });

    gulp.watch('less/**/*.less', ['less']);
    gulp.watch('js/**/*.js', ['js']);
    gulp.watch('partial/**/*.html', ['partial']);
});

gulp.task('less', function () {
    return gulp.src('less/style.less')
        .pipe(sourcemaps.init())
        .pipe(less())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('public'))
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task('js', function () {
    return gulp.src('js/**/*.js')
        .pipe(order([
            'js/*.module.js',
            'js/*.config.js',
            'js/**/*.module.js',
            'js/**/*.config.js',
            'js/**/*.js',

        ], { base: './' }))
        .pipe(concat('script.js'))
        .pipe(sourcemaps.init({
            loadMaps: true
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('public'))
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task('partial', function () {
    var dest = 'public/partial';
    return gulp.src('partial/**/*.html')
        .pipe(changed(dest))
        .pipe(gulp.dest(dest))
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
