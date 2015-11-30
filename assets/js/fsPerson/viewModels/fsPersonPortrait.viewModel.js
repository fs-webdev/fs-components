/**
 * Translate person and options data into template variables.
 * @param {object} scope - The object to use as the scope.
 * @returns {object} The scope object to use in the template.
 *
 * @since 1.1.0
 */
function fsPersonPortraitViewModel(scope) {
  scope.person = scope.person || {};
  scope.options = scope.options || {};
  scope.portraitSize = scope.options.personCard ? "medium" : "large";
  if (scope.options.personCard) {
    // person card should always link to the person page
    scope.options.openPersonPage = true;
  }

  scope.gender = (scope.person.gender || 'unknown').toLowerCase();

  return scope;
}
