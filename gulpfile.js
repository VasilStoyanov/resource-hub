const gulp = require('gulp');
const webpack = require('webpack-stream');
const webpackConfig = require('./webpack.config.js');

gulp.task('default', ['build']);

gulp.task('build', () => gulp.src('./client/src/')
  .pipe(webpack(webpackConfig))
  .pipe(gulp.dest('./client/dist/')));
