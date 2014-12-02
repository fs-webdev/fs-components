var uid = 0;  // unique id needed for show/hide parent label + input

/**
 * Output a person's vitals (name, lifeSpan, and id).
 * @param {object} person - Person to render.
 * @property {string} [person.gender]
 * @property {string} [person.lifeSpan]
 * @property {string} [person.fullLifeSpan]
 * @property {string} [person.id]
 *
 * @param {object} options - How to render the person.
 * @property {boolean} [options.hideLifeSpan=false] - Hide the lifespan.
 * @property {string}  [options.lifeSpan=short] - Show the short or the full lifeSpan (short,long).
 * @property {boolean} [options.hideId=false] - Hide the person id.
 * @property {boolean} [options.openPersonCard=false] - Add a link to open the person card when the name is clicked.
 *
 * @returns {element}
 *
 * @since 1.3.0
 */
fsModules.registerDirective('fsPersonVitals', ['person', 'options', function(person, options) {
  var scope = fsPersonVitalsViewModel({person: person, options: options});

  scope.uid = uid++;

  // convert the angular template
  var templateStr = getTemplateStr('fsPersonVitals');
  var template = this.parseTemplate(templateStr, scope);

  // add parents in the link function since Angular will get into
  // an infinite state if it is added to the DOM (even behind and ng-if).
  // This implies that Angular tries to parse the entire DOM tree before it
  // does any ng calculations.
  if (scope.options.showParents && scope.person.parents) {
    var parents = this.fsCoupleInfo(scope.person.parents.father, scope.person.parents.mother, {showParents: false, iconSize: 'small'});
    template.querySelector('.fs-person__fs-person-parents').appendChild(parents);
  }

  return template;
}], {restrict: 'E', replace: true});