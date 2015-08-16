var gulp = require('gulp');
var browserSync = require('browser-sync');
var less = require('gulp-less');
var sourcemaps = require('gulp-sourcemaps');
var concat = require('gulp-concat');
var del = require('del');
var changed = require('gulp-changed');
var order = require('gulp-order');
var merge = require('merge-stream');

gulp.task('default', ['clean'], function () {
    gulp.start('less', 'js', 'partial');

    browserSync({
        server: {
            baseDir: 'public'
        }
    });

    gulp.watch('module/**/*.less', ['less']);
    gulp.watch('lib/**/*.less', ['less']);
    gulp.watch('module/**/*.js', ['js']);
    gulp.watch('module/**/*.html', ['partial']);
});

gulp.task('less', function () {
    var theirless = gulp.src('lib/less/bootstrap.less')
        .pipe(sourcemaps.init())
        .pipe(less())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('public'))
        .pipe(browserSync.reload({
            stream: true
        }));
    
    var myless = gulp.src('module/**/*.less')
        .pipe(sourcemaps.init())
        .pipe(less())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('public'))
        .pipe(browserSync.reload({
            stream: true
        }));
    
    return merge(theirless, myless);
});

gulp.task('js', function () {
    return gulp.src('module/**/*.js')
        .pipe(order([
            'module/*.module.js',
            'module/*.config.js',
            'module/**/*.module.js',
            'module/**/*.config.js',
            'module/**/*.js',

        ], { base: '.' }))
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
    var dest = 'public';
    return gulp.src('module/**/*.html')
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
