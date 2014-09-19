/**
 * Render a person's vitals (name, lifeSpan, and id).
 *
 * @since 1.1.0
 */
angular.module('ngFsModules')
       .directive('fsPersonVitals', function() {
  return {
    restrict: 'E',
    replace: true,
    template: templateList.fsPersonVitals,
    scope: {
      person: '=',
      config: '&',
    },
    link: function(scope, element, attrs) {
      scope.options = scope.config() || {};

      scope = fsPersonVitalsViewModel(scope);

      // scope.$watch('person', fsPersonVitalsWatchAction() {
      //   scope = fsPersonVitalsViewModel(scope);
      // });
    }
  };
});