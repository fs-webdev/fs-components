/**
 * Output a person's portrait with their gender and vitals (name, lifeSpan, and id).
 * @param {object} person - Person to render.
 * @property {string} [person.gender]
 * @property {string} [person.lifeSpan]
 * @property {string} [person.fullLifeSpan]
 * @property {string} [person.id]
 *
 * @param {object} options - How to render the person.
 * @property {string}  [options.iconSize=medium] - Size of the gender icon (small,medium).
 * @property {boolean} [options.hideGender=false] - Hide the gender icon.
 * @property {boolean} [options.hideLifeSpan=false] - Hide the lifespan.
 * @property {string}  [options.lifeSpan=short] - Show the short or the full lifeSpan (short,long).
 * @property {boolean} [options.hideId=false] - Hide the person id.
 * @property {boolean} [options.openPersonCard=false] - Add a link to open the person card when the name is clicked.
 *
 * @returns {element}
 *
 * @since 1.1.0
 */
fsModules.registerDirective('fsPersonPortrait', ['person', 'options', function(person, options) {
  var scope = fsPersonPortraitViewModel({person: person, options: options});

  // the iconSmall must be set to 'small' when combined with the portrait
  scope.options.iconSize = 'small';

  // convert the angular template
  var templateStr = templateList.fsPersonPortrait;
  var template = this.parseTemplate(templateStr, scope);

  return template;
}], {restrict: 'E', replace: true});