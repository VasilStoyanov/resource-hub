const gulp = require('gulp');
const eslint = require('gulp-eslint');

gulp.task('lint', () => gulp.src(['**/*.js', '!node_modules/**', '!client/dist/**', '!client/dist_workers/**'])
  .pipe(eslint())
  .pipe(eslint.format())
  .pipe(eslint.failAfterError()));

gulp.task('default', gulp.series('lint'));
