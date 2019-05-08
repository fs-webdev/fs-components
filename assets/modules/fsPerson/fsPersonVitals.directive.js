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
 * @property {boolean} [options.nameWrapper] - Replace the div surrounding the name of the person with a heading tag (h3, h4, h5, etc.)
 *
 * @returns {element}
 *
 * @since 1.3.0
 */
fsModules.registerDirective('fsPersonVitals', ['person', 'options', function(person, options) {
  var scope = fsPersonVitalsViewModel({person: person, options: options});
  scope.openPersonCardCmd = null;

  // Add data-cmd to person's name if option.openPersonCard is true and option.openPersonPage is false.
  if (scope.options.openPersonCard && !scope.options.openPersonPage) {
    scope.openPersonCardCmd = "openPersonCard";
  }

  scope.uid = uid++;

  // convert the angular template
  var templateStr = getTemplateStr('fsPersonVitals');
  var template = this.parseTemplate(templateStr, scope);

  // add parents in the link function since Angular will get into
  // an infinite state if it is added to the DOM (even behind and ng-if).
  // This implies that Angular tries to parse the entire DOM tree before it
  // does any ng calculations.
  if (scope.options.showParents && scope.person.parents) {
    var parents = this.fsCoupleInfo(scope.person.parents.parent1, scope.person.parents.parent2, {showParents: false, iconSize: 'small'});
    template.querySelector('.fs-person__fs-person-parents').appendChild(parents);
  }

  // Functionality for name wrapper option
  // NOTE: in order for this to work for the person summary, the fs-person-vitals__name class must be left off of the name wrapper in order for the correct font size to show.
  if (scope.person && scope.person.name && scope.options.nameWrapper) {
      var name = template.querySelector('.fs-person-vitals__name');
      var wrap = '<' + scope.options.nameWrapper + ' style="padding:0; margin:0;">' + name.innerHTML + '</' + scope.options.nameWrapper + '>';
      name.innerHTML = wrap;
  }

  return template;
}], {restrict: 'E', replace: true});
