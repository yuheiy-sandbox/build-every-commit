const del = require('del')
const gulp = require('gulp')
const gulpif = require('gulp-if')
const sass = require('gulp-sass')
const cssnano = require('gulp-cssnano')
const browserSync = require('browser-sync').create()

const isRelease = process.argv.includes('--release')
const destDir = isRelease ? 'dist' : '.tmp'

const html = () =>
  gulp.src('src/index.html')
    .pipe(gulp.dest(destDir))

const css = () =>
  gulp.src('src/style.scss')
    .pipe(sass())
    .pipe(gulpif(isRelease, cssnano()))
    .pipe(gulp.dest(destDir))

const serve = done => {
  browserSync.init({
    server: 'dist',
  })

  done()
}

const clean = () => del(['dist', '.tmp'])

exports.default = gulp.series(
  clean,
  gulp.parallel(html, css),
  serve
)

exports.build = gulp.series(
  clean,
  gulp.parallel(html, css)
)
