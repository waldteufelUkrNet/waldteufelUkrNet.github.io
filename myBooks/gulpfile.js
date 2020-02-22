'use strict'
// gulpfile for gulp 4.0.0
// waldteufel@ukr.net

// gulp.series(['pug', 'sass'])   - послідовне виконання
// gulp.parallel(['pug', 'sass']) - асинхронне виконання

// на майбутнє: мініфікація картинок у проміжну теку (з changed), build уже через неї
////////////////////////////////////////////////////////////////////////////////
/* ↓↓↓ VARIABLES ↓↓↓ */
const gulp         = require('gulp'),                  //
      autoprefixer = require('gulp-autoprefixer'),     // додавання вендорних префіксів
      babel        = require("gulp-babel"),            // ES6 -> ES5
      browserSync  = require('browser-sync').create(), // створення віртуального серверу для live reload
      cache        = require('gulp-cache'),            // бібліотека кешування
      changed      = require('gulp-changed'),          // контроль за змінами у файлах - пропускає потік далі, тільки якщо були зміни у файлі
      concat       = require('gulp-concat'),           // склеювання js-файлів
      cssconcat    = require('gulp-concat-css'),       // склеювання css-файлів
      cssnano      = require('gulp-cssnano'),          // мініфікація css-файлів
      csso         = require('gulp-csso'),             // мініфікація css-файлів
      del          = require('del'),                   // видалення файлів і тек
      gp           = require('gulp-load-plugins')(),   // щоб не оголошувати кожну змінну, застосовується для плагінів із префіксом gulp-
      imagemin     = require('gulp-imagemin'),         // робота із зображеннями
      notify       = require('gulp-notify'),           // обробка повідомлень про помилки
      pngquant     = require('imagemin-pngquant-gfw'), // потрібен для роботи gulp-imagemin
      pug          = require('gulp-pug'),              // перетворення pug в html
      purge        = require('gulp-css-purge'),        // видалення дублюючого коду css
      rename       = require('gulp-rename'),           // перейменовування файлів
      sass         = require('gulp-sass'),             // перетворення sass/scss в css
      sourcemaps   = require('gulp-sourcemaps'),       //
      uglify       = require('gulp-uglify');           // мініфікація js-файлів
/* ↑↑↑ /VARIABLES ↑↑↑ */
////////////////////////////////////////////////////////////////////////////////
/* ↓↓↓ TASKS ↓↓↓ */

// index.pug -> index.html
gulp.task('indexPug', function() {
  return gulp.src('app/index.pug')
    // .pipe(changed('app/', {extension: '.html'}))
    .pipe(pug({
      pretty : true
    }))
    .on('error', notify.onError({
      message : 'Error: <%= error.message %>',
      title   : 'PUG error'
    }))
    .pipe(gulp.dest('app/'))
});

// book.pug -> book.html
gulp.task('booksPug', function() {
  return gulp.src('app/books/*/*.pug')
    .pipe(changed('app/books/*/', {extension: '.html'}))
    .pipe(pug({
      pretty : true
    }))
    .on('error', notify.onError({
      message : 'Error: <%= error.message %>',
      title   : 'PUG error'
    }))
    .pipe(gulp.dest('app/books/'))
});

// server for live reload
gulp.task('browser-sync', function() {
  browserSync.init({
    server : {
      baseDir : 'app'
    },
    notify: false // відключення повідомлень browserSync
  });
});

// scss -> css: files
gulp.task('filesSass', function() {
  return gulp.src(['app/scss/**/*.+(scss|sass)'])
  .pipe(sass({outputStyle: 'expanded'}))
  .on('error', notify.onError({
    message : 'Error: <%= error.message %>',
    title   : 'SASS error'
  }))
  .pipe(autoprefixer({
    browsers : ['last 10 versions', '> 1%', 'ie 8', 'ie 7'],
    cascade  : true
  }))
  // .pipe(csso({
  //   restructure : true, // злиття декларацій
  //   sourceMap   : false,
  //   debug       : false // виведення в консоль детальної інформації
  // }))
  .pipe(gulp.dest('app/css'))
  .pipe(browserSync.reload({stream:true}))
});

// scss -> css: modules
gulp.task('modulesSass', function() {
  return gulp.src(['app/modules/**/*.+(scss|sass)'])
  .pipe(sass({outputStyle: 'expanded'}))
  .on('error', notify.onError({
    message : 'Error: <%= error.message %>',
    title   : 'SASS error'
  }))
  .pipe(autoprefixer({
    browsers : ['last 10 versions', '> 1%', 'ie 8', 'ie 7'],
    cascade  : true
  }))
  .pipe(cssconcat("modules.css"))
  .pipe(gulp.dest('app/css'))
  .pipe(browserSync.reload({stream:true}))
});

// ES6 -> ES5: files
gulp.task('filesJs', function() {
  return gulp.src(['app/js-expanded/*.js'])
    .pipe(babel())
    // .pipe(uglify())
    .pipe(gulp.dest('app/js'))
    .pipe(browserSync.reload({stream:true}));
});

// ES6 -> ES5: modules
gulp.task('modulesJs', function() {
  return gulp.src(['app/modules/**/*.js'])
    .pipe(babel())
    .pipe(concat({ path: 'modules.js'}))
    .pipe(gulp.dest('app/js'))
    .pipe(browserSync.reload({stream:true}));
});

// watching & live reload
gulp.task('watch', gulp.parallel(
  gulp.series('modulesSass', 'filesSass', 'modulesJs', 'filesJs', 'booksPug', 'indexPug', 'browser-sync'),
  function() {
    gulp.watch(['app/scss/**/*.+(scss|sass)'], gulp.series('filesSass'));
    gulp.watch(['app/modules/**/*.scss'], gulp.series('modulesSass'));

    gulp.watch(['app/js-expanded/*.js'], gulp.series('filesJs'));
    gulp.watch(['app/modules/**/*.js'], gulp.series('modulesJs'));

    gulp.watch(['app/index.pug'], gulp.series('indexPug'));
    gulp.watch(['app/books/*/*.pug', 'app/templates/*.pug', 'app/modules/*/*.pug'], gulp.series('booksPug'));

    gulp.watch('app/*.html').on('change',  browserSync.reload);
    gulp.watch('app/books/*/*.html').on('change',  browserSync.reload);
  }
));

// // чищення каталогу dist
// gulp.task('clean', function(done) {
//   return del('dist');
//   done();
// });

// // обробка зображень
// gulp.task('img', function() {
//   return gulp.src('app/assets/img/**/*')
//     // .pipe(cache(imagemin({
//     //   interlaced  : true,
//     //   progressive : true,
//     //   svgoPlugins : [{removeViewBox: false}],
//     //   use         : [pngquant()]
//     // })))
//     .pipe(gulp.dest('dist/assets/img'));
// });

// // очистка кешу
// gulp.task('clear', function () {
//     return cache.clearAll();
// })

// // перенесення файлів з каталогу app в dist
// gulp.task('build', gulp.series(['clean', 'img'], function(done) {

//   // pug -> html
//   gulp.src('app/assets/pug/*.pug').pipe(pug({pretty : false})).pipe(gulp.dest('dist/'));

//   // fonts
//   gulp.src('app/assets/fonts/**/*').pipe(gulp.dest('dist/assets/fonts'));

//   // libs
//   gulp.src('app/assets/libs-js/**/*').pipe(uglify()).pipe(gulp.dest('dist/assets/libs-js/'));
//   gulp.src('app/assets/libs-css/**/*').pipe(csso()).pipe(gulp.dest('dist/assets/libs-css/'));

//   // js
//   gulp.src('app/assets/js/**/*').pipe(uglify()).pipe(gulp.dest('dist/assets/js/'));

//   // css
//   gulp.src('app/assets/css/**/*').pipe(csso()).pipe(gulp.dest('dist/assets/css/'));

//   done();
// }));
/* ↑↑↑ /TASKS ↑↑↑ */
////////////////////////////////////////////////////////////////////////////////