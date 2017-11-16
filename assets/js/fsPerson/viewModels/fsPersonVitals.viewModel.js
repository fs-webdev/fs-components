/**
 * Translate person and options data into template variables.
 * @param {object} scope - The object to use as the scope.
 * @property {string} [scope.options.father] - Either passed through in the template config, or created from the person.fatherId property
 * @property {string} [scope.options.mother] - Either passed through in the template config, or created from the person.motherId property
 * @property {string} [scope.options.spouse] - Either passed through in the template config, or created from the person.spouseId property
 * @returns {object} The scope object to use in the template.
 *
 * @since 1.1.0
 */
function fsPersonVitalsViewModel(scope) {
  if (!scope.person || Object.getOwnPropertyNames(scope.person).length === 0) {
    delete scope.options.father;
    delete scope.options.mother;
    delete scope.options.spouse;
  }

  scope.person = scope.person || {};
  scope.options = scope.options || {};
  scope.options.father = scope.options.father || scope.person.fatherId || undefined;
  scope.options.mother = scope.options.mother || scope.person.motherId || undefined;
  scope.options.spouse = scope.options.spouse || scope.person.spouseId || undefined;

  scope.name = '';
  scope.givenPart = '';
  scope.familyPart = '';
  if (fsModules.getTrimmedValue(scope.person.name)) {
    scope.name = fsModules.getTrimmedValue(scope.person.name);
  }
  else if (scope.person.id) {
    scope.name = lang.UNKNOWN_NAME;
  }

  if (fsModules.propertyExists('nameConclusion.details.nameForms', scope.person)
      && scope.person.nameConclusion.details.nameForms[0]
      && (fsModules.getTrimmedValue(scope.person.nameConclusion.details.nameForms[0].givenPart) ||
          fsModules.getTrimmedValue(scope.person.nameConclusion.details.nameForms[0].familyPart))) {
    scope.givenPart = fsModules.getTrimmedValue(scope.person.nameConclusion.details.nameForms[0].givenPart);
    scope.familyPart = fsModules.getTrimmedValue(scope.person.nameConclusion.details.nameForms[0].familyPart);
  }
  else if (scope.person.id) {
    scope.givenPart = lang.UNKNOWN_NAME;
    scope.familyPart = "&nbsp";
  }
  if (fsModules.propertyExists('nameConclusion.details.style', scope.person)) {
    scope.nameConclusionStyle = 'fs-person-vitals__name--' + (''+scope.person.nameConclusion.details.style).toLowerCase();
  }

// OFT-66060 - https://almtools.ldschurch.org/fhjira/browse/OFT-66060
// Need to pass in the parents and spouse to the person card to get the correct ordinances and to the person page link to show the correct family
  var params = ((scope.options.spouse)? "&spouse=" + scope.options.spouse: "") + ((scope.options.father || scope.options.mother)? "&parents=" + (scope.options.father || "UNKNOWN") + "_" + (scope.options.mother || "UNKNOWN"): "");
  scope.personPageLink = "/tree/person/details/" + scope.person.id;
  if(params) {
    scope.personPageLink = scope.personPageLink + '?1=1' + params;
  } 

  scope.openPersonCardData = JSON.stringify({
    "id": scope.person.id,
    "name": scope.person.name,
    "fatherId": scope.options.father,
    "motherId": scope.options.mother,
    "spouseId": scope.options.spouse,
    "gender": scope.person.gender,
    "linksInNewTab": scope.options.linksInNewTab
  });

  scope.lifeSpan = (scope.options.lifeSpan === 'long' ? scope.person.fullLifeSpan : scope.person.lifeSpan);

  var showDot = scope.lifeSpan && scope.person.id;

  scope.showDot = !scope.options.hideLifeSpan && !scope.options.hideId && showDot;

  scope.title = scope.name + '\n' + (scope.lifeSpan || '') + (showDot ? ' • ' : '') + (scope.person.id || '');
  if(scope.options.showBirthPlace && scope.person.birthPlace) {
    scope.title += '\n' + scope.person.birthPlace;
  }
  scope.title = FS.htmlDecode(scope.title);

  scope.setAriaId = function() {
    if(scope.person && scope.person.id) {
      // strip out all non-letter and non-number characters and then add spaces between each letter
      return scope.person.id.replace(/[^a-zA-Z0-9]/g, '').split('').join(' ');
    } else {
      return null;
    }
  }

  return scope;
}
