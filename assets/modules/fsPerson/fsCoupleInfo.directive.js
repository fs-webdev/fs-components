/**
 * Output a couple relationship.
 * @param {object} spouse1 - Spouse1 of the relationship.
 * @property {string} [spouse1.gender]
 * @property {string} [spouse1.lifeSpan]
 * @property {string} [spouse1.fullLifeSpan]
 * @property {string} [spouse1.id]
 *
 * @param {object} spouse2 - Spouse2 of the relationship.
 * @property {string} [spouse2.gender]
 * @property {string} [spouse2.lifeSpan]
 * @property {string} [spouse2.fullLifeSpan]
 * @property {string} [spouse2.id]
 *
 * @param {object} options - How to render the couple.
 * @property {string}  [options.iconSize=medium] - Size of the gender icon (small,medium).
 * @property {boolean} [options.hideGender=false] - Hide the gender icon.
 * @property {boolean} [options.hideLifeSpan=false] - Hide the lifespan.
 * @property {string}  [options.lifeSpan=short] - Show the short or the full lifeSpan (short,long).
 * @property {boolean} [options.hideId=false] - Hide the person id.
 * @property {boolean} [options.openPersonCard=false] - Add a link to open the person card when the name is clicked.
 *
 * @returns {DOMElement}
 *
 * @since 1.1.0
 */
fsModules.registerDirective('fsCoupleInfo', ['spouse1', 'spouse2', 'options', function(spouse1, spouse2, options) {
  var data = {spouse1: spouse1, spouse2: spouse2, options: options};
  if(!FS || !FS.showEx || !FS.showEx('spaEx')) { 
    data.husband = spouse1;
    data.wife = spouse2;
  }
  var scope = fsCoupleInfoViewModel(data);

  // convert the angular template
  var templateStr = templateList.fsCoupleInfo;
  var template = this.parseTemplate(templateStr, scope);

  return template;
}], {restrict: 'E', replace: true});