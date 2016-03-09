/**
 * Translate person and options data into template variables.
 * @param {object} scope - The object to use as the scope.
 * @returns {object} The scope object to use in the template.
 *
 * @since 1.1.0
 */
function fsPersonGenderViewModel(scope) {
  var defaultOptions = {
    iconSize: 'medium'
  };

  scope.person = scope.person || {};
  scope.father = scope.father || undefined;
  scope.mother = scope.mother || undefined;
  scope.spouse = scope.spouse || undefined;
  scope.options = fsModules.extend({}, defaultOptions, scope.options)

  scope.genderClass = (!scope.options.hideGender ? 'fs-person-gender--' + scope.options.iconSize : '');

  scope.genderImageClass = (!scope.options.hideGender ? 'fs-icon fs-icon-' + scope.options.iconSize + '-' + (scope.person.gender || 'unknown') : 'fs-icon fs-icon-' + scope.options.iconSize).toLowerCase();

  return scope;
}
