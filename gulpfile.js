const gulp = require('gulp');
// pages
const pug = require('gulp-pug');
const pugLinter = require('gulp-pug-linter');
// images
const webpConvert = require('gulp-webp');
// styles
const sass = require('gulp-sass')(require('sass'))
const autoprefixer = require('gulp-autoprefixer')
const shorthand = require('gulp-shorthand')
const csslint = require('gulp-csslint')
const cleanCSS = require('gulp-clean-css');
const browserSync = require('browser-sync');

// path
const path = {
    root: './bulid',
    templates: {
        pages: 'src/templates/pages/*.pug',
        src: 'src/templates/**/*.pug',
        dest: 'build/assets/'
    },
    styles: {
        src: 'src/styles/app.scss',
        dest: 'build/assets/styles'
    },
    scripts: {
        src: 'src/scripts/**/*.js',
        dest: 'build/assets/scripts'
    },
    images: {
        src: 'src/images/**/*.*',
        dest: 'build/assets/images'
    }
};

// pug + pug-linter >> html
function templates(){
    return gulp.src(path.templates.pages)
        .pipe(pugLinter({ reporter: 'default' }))
        .pipe(pug())
        .pipe(gulp.dest(path.templates.dest))
};

// scss >> css
function styles(){
    return gulp.src(path.styles.src)
        .pipe(sass())
        .pipe(sass().on('error', sass.logError)) 
        .pipe(csslint())
        .pipe(csslint.formatter())
        .pipe(autoprefixer())       
        .pipe(shorthand())
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest(path.styles.dest))
}

// jpeg,png >> webp
function webp(){
    return gulp.src(path.images.src)
    .pipe(webpConvert())
    .pipe(gulp.dest(path.images.dest))
};

// gulp watch
function watch(){
    gulp.watch(path.templates.src, templates);
    gulp.watch(path.styles.src, styles);
    // gulp.watch(path.scripts.src, scripts);
}

// server + livereload
function server(){
    browserSync.init({
        server: path.root
    });
    browserSync.watch(path.root + '/**//**.*', browserSync.reload);
}



exports.templates = templates;
exports.styles = styles;
exports.webp = webp;


gulp.task('default', gulp.series(
    gulp.parallel(templates, styles, webp),
    gulp.parallel(watch, server)
))