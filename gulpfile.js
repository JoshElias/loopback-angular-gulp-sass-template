//var BatchStream = require('batch-stream2')
var gulp = require('gulp')
var sass = require('gulp-sass');
var coffee = require('gulp-coffee')
var uglify = require('gulp-uglify')
var cleanCSS = require('gulp-clean-css')
var install = require('gulp-install');
var mainBowerFiles = require('main-bower-files');
var stylus = require('gulp-stylus')
//var livereload = require('gulp-livereload')
var include = require('gulp-include')
var concat = require('gulp-concat')
var browserify = require('gulp-browserify')
var gulpFilter = require('gulp-filter')
var watch = require('gulp-watch')
var rename = require('gulp-rename');
var gutil = require('gulp-util');
var autoprefixer = require('gulp-autoprefixer');
var child = require('child_process');
var fs = require('fs');
var rename = require('gulp-rename');
var loopbackAngular = require('gulp-loopback-sdk-angular');

var srcDir = "client";
var src = {
    css: [srcDir + "/css/**/*.css"],
    scss: [srcDir + "/css/**/*.scss"],
    js: [srcDir + "/js/**/*.js"]
};

var distDir = "client/dist";
var dist = {
    all: [distDir + '/**/*'],
    css: distDir + '/css/',
    js: distDir + '/js/',
    vendor: distDir + '/vendor/'
};



// Loopback
gulp.task('lb-ng', function () {
    return gulp.src('./server/server.js')
        .pipe(loopbackAngular())
        .pipe(rename('lb-services.js'))
        .pipe(gulp.dest('./client/js'));
});



gulp.task('install', function() {
   return gulp.src(['./bower.json', './package.json'])
        .pipe(install());
});

//
// concat *.js to `vendor.js`
// and *.css to `vendor.css`
// rename fonts to `fonts/*.*`
//
gulp.task('bower', function() {
    var jsFilter = gulpFilter('**/*.js', {restore: true});
    var cssFilter = gulpFilter('**/*.css', {restore: true});
    return gulp.src(mainBowerFiles(), { base: "./client/vendors" })
        .pipe(jsFilter)
        .pipe(concat('vendor.js'))
        .pipe(gulp.dest(dist.js))
        .pipe(jsFilter.restore)
        .pipe(cssFilter)
        .pipe(concat('vendor.css'))
        .pipe(gulp.dest(dist.css))
        .pipe(cssFilter.restore)
        .pipe(rename(function(path) {
            if (~path.dirname.indexOf('fonts')) {
                path.dirname = '/fonts'
            }
        }))
});


gulp.task('sass', function () {
    return gulp.src(src.scss)
        .pipe(sass().on('error', sass.logError))
        .pipe(concat('app.css'))
        .pipe(gulp.dest(dist.css));
});


gulp.task('js', function() {
    return gulp.src(src.js)
        .pipe(include())
        .pipe(concat('app.js'))
        .pipe(gulp.dest(dist.js))
});


gulp.task('watch', function() {
    gulp.watch(src.bower, ['bower'])
    watch({ glob: src.scss, name: 'app.css' }, ["sass"])
    watch({ glob: src.js, name: 'app.js' }, ["js"])
});


gulp.task('concat-css', function() {
    return gulp.src("client/dist/css/*.css")
        .pipe(concat('style.css'))
        .pipe(gulp.dest(dist.css))
});
gulp.task('concat-js', function() {
    return gulp.src("client/dist/js/*.js")
        .pipe(concat('main.js'))
        .pipe(gulp.dest(dist.js))
});
gulp.task('concat', ['concat-css', 'concat-js']);

gulp.task('compress-css', function() {
    return gulp.src("client/dist/css/style.css")
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9'))
        .pipe(gulp.dest("client/dist/css/style.min.css"))
});
gulp.task('compress-js', function() {
    return gulp.src("client/dist/js/main.js")
        .pipe(uglify())
        .pipe(gulp.dest("client/dist/js/main.min.js"))
});
gulp.task('compress', ['compress-css', 'compress-js']);

gulp.task('default', ['bower', "lb-ng", 'sass', 'js', 'concat']); // development
gulp.task('build', ['install', 'bower', "lb-ng", 'sass', 'js', 'concat', 'compress']); // build for production
