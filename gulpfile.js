const gulp = require('gulp');
const webpack = require('webpack-stream');
const webpackConfig = require('./webpack.config.js');
const del = require('del');

gulp.task('clean', () => del(['./client/dist/*']));

gulp.task('build', () => gulp.src('./client/src/')
  .pipe(webpack(webpackConfig))
  .pipe(gulp.dest('./client/dist/')));

gulp.task('default', gulp.series('clean', 'build'));
