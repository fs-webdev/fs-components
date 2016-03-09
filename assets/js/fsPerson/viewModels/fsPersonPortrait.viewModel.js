/**
 * Translate person and options data into template variables.
 * @param {object} scope - The object to use as the scope.
 * @returns {object} The scope object to use in the template.
 *
 * @since 1.1.0
 */
function fsPersonPortraitViewModel(scope) {
  if (!scope.person || Object.getOwnPropertyNames(scope.person).length === 0) {
    delete scope.father;
    delete scope.mother;
    delete scope.spouse;
  }
  scope.person = scope.person || {};
  scope.father = scope.father || scope.person.fatherId || undefined;
  scope.mother = scope.mother || scope.person.motherId || undefined;
  scope.spouse = scope.spouse || scope.person.spouseId || undefined;
  scope.options = scope.options || {};
  scope.portraitSize = scope.options.personCard ? "medium" : "large";
  scope.gender = (scope.person.gender || 'unknown').toLowerCase();

  return scope;
}
