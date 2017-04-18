const gulp = require('gulp');
const connect = require('gulp-connect');
gulp.task('dist', function () {
  //bs.init({ server: 'dist' })
  connect.server({
    root: ['dist'],
    host: 'localhost',
    port: 80,
    livereload: true,
    //代理请求
    middleware: function (connect, opt) {
      let Proxy = require('gulp-connect-proxy-with-headers')
      //opt.route = '/proxy';
      let proxy = new Proxy(opt);
      return [proxy];
    }
  })
});