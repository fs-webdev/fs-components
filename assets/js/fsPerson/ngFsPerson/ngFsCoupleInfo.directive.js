/**
 * Render a couple's gender with their vitals (name, lifeSpan, and id).
 *
 * @since 1.1.0
 */
angular.module('ngFsModules')
       .directive('fsCoupleInfo', function() {
  return {
    restrict: 'E',
    replace: true,
    template: templateList.fsCoupleInfo,
    scope: {
      husband: '=',
      wife: '=',
      config: '&'
    },
    link: function(scope, element, attrs) {
      scope.options = scope.config() || {};
      scope.lang = lang;
    },
    compile: function(tElement, tAttrs) {
      // since data-config must be a string, we need to append the attrs string to fs-person-gender
      tElement.find('fs-person-gender').attr('data-config', tAttrs.config);
      return this.link;
    }
  };
});