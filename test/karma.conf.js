var path = require('path'),
    projectPath = path.resolve(__dirname, '..'),
    masterConf = require(path.join(projectPath, 'node_modules/frontier-build-tools/test/fskarma10-config'));

module.exports = function(config) {
  masterConf(config, {
    projectPath: projectPath,
    testFiles: [
      'assets/js/fsModules.core/ngParser/assembly.json',
      'assets/js/fsModules.core/assembly.json',
      'assets/js/fsPerson/assembly.json',

      'assets/js/fsModules.core/test/*Test.js',
      'assets/js/fsPerson/test/*Test.js'
    ]
  });
}
