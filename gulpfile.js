const gulp = require('gulp');
const path = require('path');

// your gulp tasks here






// create a shared registry between the master gulpfile and your gulpfile
const configure = require('frontier-build-tools/plugins/configure-registry');
gulp.registry(configure({

}));

// register the master gulpfile with gulp. This MUST be declared after all your gulp tasks
// to be able to run multiple gulp tasks of the same name
const HubRegistry = require('gulp-hub');
const hub = new HubRegistry([path.relative(__dirname, require.resolve('frontier-build-tools/gulpfile.js'))]);
gulp.registry(hub);
