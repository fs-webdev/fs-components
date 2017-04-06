var path = require('path'),
    projectPath = path.resolve(__dirname, '..'),
    masterConf = require(path.join(projectPath, 'node_modules/frontier-build-tools/test/fskarma10-config'));

module.exports = function(config) {
  masterConf(config, {
    projectPath: projectPath,
    // singleRun: true,
    // browsers: ['Chrome', 'Firefox', 'Safari', 'PhantomJS'],
    testFiles: [
      'assets/js/fsModules.core/ngParser/assembly.json',
      'assets/js/fsModules.core/assembly.json',
      'assets/js/fsPerson/assembly.json',

      'assets/js/fsModules.core/test/*Test.js',
      'assets/js/fsPerson/test/*Test.js'
    ],

    // BEGIN code coverage reporting configuration
    reporters: ['coverage', 'dots'],
    preprocessors: {
      // NOTE: Whatever files you want to preprocess for code coverage have to be loaded in the testFiles section, above, or they will not be found by the preprocessor
      'assets/js/fsPerson/assembly.json': 'coverage', // Load all assembly files
    },
    coverageReporter: {
      // The 'check' option allows you to set a coverage threshold for each individual coverage section. If the section does not equal or exceed the threshold value, karma will fail the run.
      check: {
        global: {
            statements: 80,
            branches: 70,
            functions: 80
        }
      },
      includeAllSources: true,
      instrumenterOptions: {
        istanbul: {
          noCompact: true,
          preserveComments: true
        }
      },
      dir : 'reports/coverage/client/',
      reporters: [
        // Un-comment html report if you want line-by-line detail of what is and is not covered for each file
        {
          type : 'html',
          subdir : 'html',
        },
        {
          type : 'lcovonly',
          subdir: '.',
          file : 'lcov.txt',
        },
        {
          type : 'text',
          subdir: '.',
          file : 'text.txt',
        },
        {
          type : 'text-summary',
          subdir: '.',
          file : 'text-summary.txt',
        },
        // If you don't specify a file, output is sent to the console
        {
          type : 'text',
        },
        {
          type : 'text-summary'
        }
      ]
    }
    // END code coverage reporting configuration
  });
}
