/**
 * Render a person's gender with their vitals (name, lifeSpan, and id).
 *
 * @since 1.1.0
 */
angular.module('ngFsModules')
       .directive('fsPersonGender', function() {
  return {
    restrict: 'E',
    replace: true,
    template: templateList.fsPersonGender,
    scope: {
      person: '=',
      config: '&'
    },
    link: function(scope, element, attrs) {
      scope.options = scope.config() || {};
      scope.options.iconSize = scope.options.iconSize || 'medium';
      scope.lang = lang;
    },
    compile: function(tElement, tAttrs) {
      // since data-config must be a string, we need to append the attrs string to fs-person-vitals
      tElement.find('fs-person-vitals').attr('data-config', tAttrs.config);
      return this.link;
    }
  };
});