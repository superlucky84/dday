const gulp = require('gulp');
const gutil = require('gulp-util');
const babel = require('gulp-babel');
const path = require('path');

gulp.task('default', () => {
  return gulp.src('src/app.js')
  .pipe(babel({
    presets: ['es2015','react']
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
