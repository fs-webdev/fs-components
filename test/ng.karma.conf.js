var path = require('path'),
    basePath = path.resolve(__dirname, '..'),
    masterConf = require(path.join(basePath, 'node_modules/frontier-build-tools/test/karma.config'));

module.exports = function(config) {
  masterConf(config, {
    basePath: basePath,
    files: [
      'dist/components/hf/assets/js/fs/fs.js',
      'dist/components/angular/angular.js',
      'dist/components/angular-mocks/angular-mocks.js',
      'dist/components/angular-sanitize/angular-sanitize.js',
      'dist/components/angular-animate/angular-animate.js',
      'dist/modules/utils/runTestWithAngular.js',
      'dist/modules/fsModules.core/fsModules.core.js',
      'dist/modules/fsModules/ngFsModules/ngFsModules.js',

      'assets/modules/fsModules.core/test/*Test.js',
      'assets/modules/fsPerson/test/*Test.js',
    ],
    frameworks: [ 'chai' ],
    browsers: [ 'PhantomJS' ],
    // browsers: ['Chrome', 'Firefox', 'Safari', 'PhantomJS'],
    // singleRun: true,

    reporters: ['dots']
  });
}
