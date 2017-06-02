var path = require('path'),
    basePath = path.resolve(__dirname, '..'),
    masterConf = require(path.join(basePath, 'node_modules/frontier-build-tools/test/karma.config'));

module.exports = function(config) {
  masterConf(config, {
    basePath: basePath,
    files: [
      'dist/components/hf/assets/js/fs/fs.js',
      'dist/modules/fsModules.core/ngParser/ngParser.js',
      'dist/modules/fsModules.core/fsModules.core.js',
      'dist/modules/fsPerson/fsPerson.js',

      'assets/modules/fsModules.core/test/*Test.js',
      'assets/modules/fsPerson/test/*Test.js'
    ],
    frameworks: [ 'chai' ],
    browsers: [ 'PhantomJS' ],
    // browsers: ['Chrome', 'Firefox', 'Safari', 'PhantomJS'],
    // singleRun: true,

    reporters: ['dots']
  });
}
