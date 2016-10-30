const gulp = require('gulp');
const gutil = require('gulp-util');
const babel = require('gulp-babel');
const path = require('path');

gulp.task('default', () => {
  return gulp.src('src/**/*.js')
  .pipe(babel({
    presets: ['react','es2015']
  }))
  .pipe(gulp.dest('dist'));
});

paths = {
  src: path.resolve(__dirname, './src'),
  dest: path.resolve(__dirname, './dist')
},

gulp.task('watch', ['default'], function() {

  gulp.watch(paths.src + '/**/*.js', ['default']);

});
