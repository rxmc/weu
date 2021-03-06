(function() {

  'use strict';

  // Include Gulp & Plugins
  var gulp         = require('gulp'),
      sass         = require('gulp-sass'),
      cleanCSS     = require('gulp-clean-css'),
      autoprefixer = require('gulp-autoprefixer'),
      runSequence  = require('run-sequence'),
      concat       = require('gulp-concat'),
      rename       = require('gulp-rename'),
      uglify       = require('gulp-uglify'),
      jshint       = require('gulp-jshint'),
      plumber      = require('gulp-plumber'),
      gutil        = require('gulp-util'),
      replace      = require('gulp-replace'),
      size         = require('gulp-size'),
      fs           = require('fs');

  var onError = function( err ) {
    console.log('An error occurred:', gutil.colors.magenta(err.message));
    gutil.beep();
    this.emit('end');
  };

  // SASS
  gulp.task('sass', function () {
    return gulp.src('./assets/sass/*.scss')
    .pipe(plumber({ errorHandler: onError }))
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(rename({suffix: '.min'}))
    .pipe(cleanCSS())
    .pipe(gulp.dest('./assets/css'))
    .pipe(size());
  });

  gulp.task('inlinecss', function() {
    return gulp.src(['partials/inline-css.hbs'])
    .pipe(replace('@@compiled_css', fs.readFileSync('assets/css/app.min.css')))
    .pipe(gulp.dest('partials/compiled'));
  });

  // JavaScript
  gulp.task('js', function() {
    return gulp.src([
      './bower_components/jquery/dist/jquery.js',
      './bower_components/instafeed.js/instafeed.js',
      './bower_components/bootstrap-transition/scripts/transition.js',
      './bower_components/zoom.js/dist/zoom.js',
      './bower_components/jquery.fitvids/jquery.fitvids.js',
      './bower_components/jQuery-viewport-checker/dist/jquery.viewportchecker.min.js',
      './node_modules/evil-icons/assets/evil-icons.min.js',
      './node_modules/clipboard/dist/clipboard.js',
      './node_modules/prismjs/prism.js',
      './node_modules/lunr/lunr.js',
      './node_modules/lunr-languages/lunr.stemmer.support.js',
      './node_modules/lunr-languages/lunr.ru.js',
      './node_modules/lunr-languages/lunr.fr.js',
      './node_modules/lunr-languages/lunr.de.js',
      './node_modules/lunr-languages/lunr.es.js',
      './node_modules/lunr-languages/lunr.pt.js',
      './node_modules/lunr-languages/lunr.it.js',
      './node_modules/lunr-languages/lunr.fi.js',
      './node_modules/lunr-languages/lunr.du.js',
      './node_modules/lunr-languages/lunr.da.js',
      './node_modules/lunr-languages/lunr.multi.js',
      './assets/js/ghosthunter.js',
      './assets/js/app.js'])
      .pipe(jshint())
      .pipe(jshint.reporter('jshint-stylish'))
      .pipe(concat('app.js'))
      .pipe(rename({suffix: '.min'}))
      .pipe(uglify())
      .pipe(gulp.dest('./assets/js'))
      .pipe(size());
  });

  // Watch
  gulp.task('watch', function() {
    gulp.watch('assets/sass/**/*.scss', ['build_css']);
    gulp.watch(['./assets/js/app.js', './assets/js/ghosthunter.js'], ['js']);
  });

  // Build CSS
  gulp.task('build_css', [], function() {
    runSequence('sass', 'inlinecss');
  });

  // Build
  gulp.task('build', [], function() {
    runSequence('build_css', 'js');
  });

  // Default
  gulp.task('default', ['watch'], function() {
    gulp.start('build');
  });

})();