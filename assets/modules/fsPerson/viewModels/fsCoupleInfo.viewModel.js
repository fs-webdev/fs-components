/**
 * Translate spouse1, spouse2, and options data into template variables.
 * @param {object} scope - The object to use as the scope.
 * @returns {object} The scope object to use in the template.
 *
 * @since 1.1.0
 */
function fsCoupleInfoViewModel(scope) {
  scope.spouse1 = scope.spouse1 || {};
  scope.spouse2 = scope.spouse2 || {};
  scope.options = scope.options || {};
  return scope;
}