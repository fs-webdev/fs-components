/**
 * Translate person and options data into template variables.
 * @param {object} scope - The object to use as the scope.
 * @returns {object} The scope object to use in the template.
 *
 * @since 1.1.0
 */
function fsPersonVitalsViewModel(scope) {
  scope.person = scope.person || {};
  scope.options = scope.options || {};

  scope.name = '';
  if (scope.person.name && scope.person.name.trim()) {
    scope.name = scope.person.name.trim();
  }
  else if (scope.person.id) {
    scope.name = lang.UNKNOWN_NAME;
  }

  if (fsModules.propertyExists('nameConclusion.details.style', scope.person)) {
    scope.nameConclusionStyle = 'fs-person-vitals__name--' + (''+scope.person.nameConclusion.details.style).toLowerCase();
  }

  scope.openPersonCardData = JSON.stringify({
    "id": scope.person.id,
    "name": scope.person.name,
    "gender": scope.person.gender
  });

  scope.lifeSpan = (scope.options.lifeSpan === 'long' ? scope.person.fullLifeSpan : scope.person.lifeSpan);

  var showDot = scope.lifeSpan && scope.person.id;

  scope.showDot = !scope.options.hideLifeSpan && !scope.options.hideId && showDot;

  scope.title = scope.name + '\n' + (scope.lifeSpan || '') + (showDot ? ' • ' : '') + (scope.person.id || '');

  return scope;
}