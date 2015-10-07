var path = require('path'),
    projectPath = path.resolve(__dirname, '..'),
    masterConf = require(path.join(projectPath, 'node_modules/frontier-build-tools/test/fskarma10-config'));

module.exports = function(config) {
  masterConf(config, {
    projectPath: projectPath,
    // singleRun: true,
    // browsers: ['Chrome', 'Firefox', 'Safari', 'PhantomJS'],
    testFiles: [
      'node_modules/theme-engage/vendor/angularjs/js/angular-1.2.16/angular.js',
      'node_modules/theme-engage/vendor/angularjs/js/angular-1.2.16/angular-mocks.js',
      'node_modules/theme-engage/vendor/angularjs/js/angular-1.2.16/angular-sanitize.js',
      'node_modules/theme-engage/vendor/angularjs/js/angular-1.2.16/angular-animate.js',
      'assets/js/utils/runTestWithAngular.js',
      'assets/js/fsModules.core/assembly.json',
      'assets/js/fsModules.core/ngFsModules.core/assembly.json',
      'assets/js/fsPerson/ngFsPerson/assembly.json',

      'assets/js/fsModules.core/test/*Test.js',
      'assets/js/fsPerson/test/*Test.js',
    ]
  });
}
