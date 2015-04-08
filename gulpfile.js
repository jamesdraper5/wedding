var gulp = require('gulp');  
var concat = require('gulp-concat');  
var filter = require('gulp-filter');  
var mainBowerFiles = require('main-bower-files');

var coffeelint = require('gulp-coffeelint');

var coffee = require('gulp-coffee');
var gutil = require('gulp-util');
var sourcemaps = require('gulp-sourcemaps');
var chalk = require('chalk');

var less = require('gulp-less');
var browserSync = require('browser-sync');
var reload      = browserSync.reload;
var minifyCSS = require('gulp-minify-css');

var $ = require('gulp-load-plugins')()


// Config
var bases = {
    dist: './dist/',
    src: './src/',
    docs: './docs/'
};

bases.bower = bases.src + 'libs/bower/';
bases.css = bases.src + 'css/';
bases.app = bases.src + 'app/';

var paths = {
    images: ['images/**/*.png']
};
    


gulp.task('coffee', function () {
    return gulp.src(bases.app + '**/*.coffee', {base: bases.app})
        .pipe($.changed(bases.app, { extension: '.js' }))
        .pipe($.plumber({
            errorHandler: console.log
        }))
        .pipe($.coffeelint('./node_modules/teamwork-coffeelint-rules/coffeelint.json'))
        .pipe($.coffeelint.reporter())
        .pipe($.coffeelintThreshold(10, 0, function(numberOfWarnings, numberOfErrors) {
            $.util.beep()
            console.error( chalk.bgRed(chalk.black("ERROR:")) + chalk.red(" CoffeeScript compilation failure") + " due to $.coffeeLint violations; see above. Warning count: " + chalk.blue(numberOfWarnings) + ". Error count: " + chalk.red(numberOfErrors) + ".");
        }))
        .pipe($.coffee({
            bare: true
        }))
        .pipe(gulp.dest(bases.app))
        /*
        */
});

// Static Server + watching scss/html files
gulp.task('serve', ['less'], function() {

    browserSync({
        server: "./"
    });

    gulp.watch("app/less/*.less", ['less']);
    gulp.watch("/*.html").on('change', reload);
    gulp.watch(bases.app + '**/*.coffee', ['coffee']);
});


// Compile Less into CSS & auto-inject into browsers
gulp.task('less', function () {
    return gulp.src('app/less/main.less')
        .pipe(less()
            .on('error', gutil.log)
            .on('error', gutil.beep)
        )
        .pipe(minifyCSS({keepSpecialComments: 1}))
        .pipe(gulp.dest('app/css/'))
        .pipe(reload({stream: true}));
});






gulp.task('default', ['serve']);




gulp.task('watch', function () {
    //gulp.watch('app/less/*.less', ['less']);
    //gulp.watch(['./js/site.js,', './js/temp.js'], ['lint']);
});

//gulp.task('default', ['less', 'watch', 'browser-sync', 'lint']);













var filterByExtension = function(extension){  
    return filter(function(file){
        return file.path.match(new RegExp('.' + extension + '$'));
    });
};




/*
gulp.task('default', function(){  
    var mainFiles = mainBowerFiles();

    if(!mainFiles.length){
        // No main files found. Skipping....
        return;
    }

    var jsFilter = filterByExtension('js');

    return gulp.src(mainFiles)
        .pipe(jsFilter)
        .pipe(concat('third-party.js'))
        .pipe(gulp.dest('./app'))
        .pipe(jsFilter.restore())
        .pipe(filterByExtension('css'))
        .pipe(concat('third-party.css'))
        .pipe(gulp.dest('./app'));
});
*/








gulp.task('lint', function () {
    gulp.src('./src/*.coffee')
        .pipe(coffeelint())
        .pipe(coffeelint.reporter())
});








/*
gulp.task('coffee', function() {

    gulp.src('./src/*.coffee')
      .pipe(sourcemaps.init())
      .pipe(coffee({ bare: true })).on('error', gutil.log)
      .pipe(sourcemaps.write('./maps'))
      .pipe(gulp.dest('./public/js'));
});
*/








 







/*
// npm install --save-dev gulp gulp-changed gulp-jscs gulp-uglify
var changed = require('gulp-changed');
var jscs = require('gulp-jscs');
var uglify = require('gulp-uglify');

// we define some constants here so they can be reused
var SRC = 'src/*.js';
var DEST = 'dist';


gulp.task('default', function() {
    return gulp.src(SRC)
        // the `changed` task needs to know the destination directory
        // upfront to be able to figure out which files changed
        .pipe(changed(DEST))
        // only files that has changed will pass through here
        .pipe(jscs())
        .pipe(uglify())
        .pipe(gulp.dest(DEST));
});
*/





