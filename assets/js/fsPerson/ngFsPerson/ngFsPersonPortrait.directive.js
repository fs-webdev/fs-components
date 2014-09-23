/**
 * Render a person's portrait with their gender and vitals (name, lifeSpan, and id).
 *
 * @since 1.1.0
 */
angular.module('ngFsModules')
       .directive('fsPersonPortrait', function() {
  return {
    restrict: 'E',
    replace: true,
    template: templateList.fsPersonPortrait,
    scope: {
      person: '=',
      config: '&'
    },
    link: function(scope, element, attrs) {
      scope.options = scope.config() || {};

      scope = fsPersonPortraitViewModel(scope);

      scope.$watch('person', function fsPersonPortraitWatchAction() {
        scope = fsPersonPortraitViewModel(scope);
      });
    },
    compile: function(tElement, tAttrs) {
      // since data-config must be a string, we need to append the attrs string to fs-person-gender
      tElement.find('fs-person-gender').attr('data-config', tAttrs.config);
      return this.link;
    }
  };
});