var { src, dest, parallel } = require('gulp');
var sass = require('gulp-sass');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var cssnano = require('cssnano');
var pug = require('gulp-pug');
var imagemin = require('gulp-imagemin');

var htmlbeautify = require('gulp-html-beautify');


var { watch, src, dest, parallel, series } = require('gulp');
var browserSync = require('browser-sync');

function buildPages() {
  return src('src/pages/*.html')
    .pipe(dest('build/'));
}

function buildStyles() {
  return src('src/styles/*.css')
    .pipe(dest('build/styles/'));
}

function buildScripts() {
  return src('src/scripts/**/*.js')
    .pipe(dest('build/scripts/'));
}

function buildAssets() {
  return src('src/assets/**/*.*')
    .pipe(dest('build/assets/'));
}

var { watch, src, dest, parallel, series } = require('gulp');

function buildPages() {
  return src('src/pages/*.html')
    .pipe(dest('build/'));
}

function buildStyles() {
  return src('src/styles/*.css')
    .pipe(dest('build/styles/'));
}

function buildScripts() {
  return src('src/scripts/**/*.js')
    .pipe(dest('build/scripts/'));
}

function buildAssets() {
  return src('src/assets/**/*.*')
    .pipe(dest('build/assets/'));
}

function watchFiles() {
  watch('src/pages/*.html', buildPages);
  watch('src/styles/*.css', buildStyles);
  watch('src/scripts/**/*.js', buildScripts);
  watch('src/assets/**/*.*', buildAssets);
}

// Соберём и начнём следить
exports.default = series(
  parallel(buildPages, buildStyles, buildScripts, buildAssets),
  watchFiles
);



//Девсервер
function devServer(cb) {
  var params = {
    watch: true,
    reloadDebounce: 150,
    notify: false,
    server: { baseDir: './build' },
  };

  browserSync.create().init(params);
  cb();
}


// Сборка
function buildPages() {
  return src('src/pages/*.html')
    .pipe(dest('build/'));
}

function buildStyles() {
  return src('src/styles/*.css')
    .pipe(dest('build/styles/'));
}

function buildScripts() {
  return src('src/scripts/**/*.js')
    .pipe(dest('build/scripts/'));
}

function buildAssets() {
  return src('src/assets/**/*.*')
    .pipe(dest('build/assets/'));
}

function buildStyles() {
  return src('src/styles/*.scss')
    .pipe(sass())
    .pipe(dest('build/styles/'));
}


function buildPages() {
  // Пути можно передавать массивами
  return src('src/pages/*.pug')
    .pipe(pug())
    .pipe(dest('build/'));
}

// Отслеживание
function watchFiles() {
  watch('src/pages/*.html', buildPages);
  watch('src/styles/*.css', buildStyles);
  watch('src/scripts/**/*.js', buildScripts);
  watch('src/assets/**/*.*', buildAssets);
  watch('src/styles/*.scss', buildStyles);
  watch(['src/pages/**/*.pug', 'src/blocks/**/*.pug'], buildPages);
}

  // Обычно при работе с Пагом файлы разносятся по разным подпапкам,
  // важно учесть это и отслеживать изменения не только страниц в /pages

  // А вот собирать лучше только то, что лежит в /pages, именно там будут шаблоны всех страниц,
  // к которым уже подключены блоки из подпапок
  

exports.default =
  parallel(
    devServer,
    series(
      parallel(buildPages, buildStyles, buildScripts, buildAssets),
      watchFiles
    )
  );



  var del = require('del');

  
  function clearBuild() {
    return del('build/');
  }
  
  
  exports.default =
    series(
      clearBuild,
      parallel(
        devServer,
        series(
          parallel(buildPages, buildStyles, buildScripts, buildAssets),
          watchFiles
        )
      )
    );


    var { src, dest, parallel } = require('gulp');





function buildStyles() {
  return src('src/styles/*.scss')
    .pipe(sass())
    .pipe(postcss([
      autoprefixer(),
      cssnano()
    ]))
    .pipe(dest('build/styles/'));
}

function buildAssets(cb) {
  // Уберём пока картинки из общего потока
  src(['src/assets/**/*.*', '!src/assets/img/**/*.*'])
    .pipe(dest('build/assets/'));

  src('src/assets/img/**/*.*')
    .pipe(imagemin())
    .pipe(dest('build/assets/img'));

  // Раньше функция что-то вовзращала, теперь добавляем вместо этого искусственый колбэк
  // Это нужно, чтобы Галп понимал, когда функция отработала и мог запустить следующие задачи
  cb();
}
