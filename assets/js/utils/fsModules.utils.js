/**
 * Shared functions needed for both JavaScript and Angular.
 * @author Steven Lambert <steven.lambert@familysearch.com>
 * @team tree - tesseract
 * @version 1.1.0
 */
window.fsModules = (function(module, FS) {

  /**
   * Test if a deep property of an object exists.
   * @param {string} property -
   * @param {object} obj - The object to look for the property in.
   * @returns {boolean}
   *
   * @since 1.1.0
   */
  module.propertyExists = function(property, obj) {
    var properties = property.split('.');
    var currentObj = obj;

    for (var i = 0, len = properties.length; i < len; i++) {
      if (!currentObj[ properties[i] ] ) {
        return false;
      }

      currentObj = currentObj[ properties[i] ];
    }

    return true;
  }

  module.getTrimmedValue = function(value) {
    return value && value.trim();
  }

  return module;
})(window.fsModules || {}, window.FS);