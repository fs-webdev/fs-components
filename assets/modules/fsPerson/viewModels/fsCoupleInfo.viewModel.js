/**
 * Translate husband, wife, and options data into template variables.
 * @param {object} scope - The object to use as the scope.
 * @returns {object} The scope object to use in the template.
 *
 * @since 1.1.0
 */
function fsCoupleInfoViewModel(scope) {
  scope.husband = scope.husband || {};
  scope.wife = scope.wife || {};
  scope.options = scope.options || {};

  return scope;
}