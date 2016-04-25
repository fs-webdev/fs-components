/**
 * Angular module.
 * @author Steven Lambert <steven.lambert@familysearch.com>
 * @team tree - tesseract
 * @version 1.1.0
 */
angular.module('ngFsModules', ['ngSanitize', 'ngAnimate', 'pasvaz.bindonce']);

// add all functions from angular into fsModules
window.fsModules = window.fsModules || {};
for (var prop in angular) {
  if (!angular.hasOwnProperty(prop) || typeof angular[prop] !== 'function') continue;

  window.fsModules[prop] = angular[prop];
}
