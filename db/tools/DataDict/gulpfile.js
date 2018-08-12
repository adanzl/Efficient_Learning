// 获取依赖
var gulp = require('gulp'),
  childProcess = require('child_process'),
  electron = require('electron');

// 创建 gulp 任务
gulp.task('run', function () {
  childProcess.spawn(electron, ['--remote-debugging-port=9223', '.'], {
    stdio: 'inherit'
  });
});
