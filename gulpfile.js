const gulp = require('gulp');
const eslint = require('gulp-eslint');
const webpack = require('webpack-stream');
const webpackConfig = require('./webpack.config.js');
const del = require('del');

gulp.task('lint', () =>
  gulp.src([
    '!node_modules/**',
    './server/**/*.js',
    // './client/src/**/*.js'
   ])
  .pipe(eslint())
  .pipe(eslint.format())
  .pipe(eslint.failAfterError())
);

gulp.task('clean', () => del(['./client/dist/*']));

gulp.task('build', () => gulp.src('./client/src/')
  .pipe(webpack(webpackConfig))
  .pipe(gulp.dest('./client/dist/')));

gulp.task('default', gulp.series('lint', 'clean', 'build'));
