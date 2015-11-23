/**
 * Translate person and options data into template variables.
 * @param {object} scope - The object to use as the scope.
 * @returns {object} The scope object to use in the template.
 *
 * @since 1.1.0
 */
function fsPersonCardPortraitViewModel(scope) {
  scope.person = scope.person || {};
  scope.options = scope.options || {};

  scope.gender = (scope.person.gender || 'unknown').toLowerCase();

  return scope;
}
