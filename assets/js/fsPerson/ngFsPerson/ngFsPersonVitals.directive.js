/**
 * Render a person's vitals (name, lifeSpan, and id).
 *
 * @since 1.3.0
 */
var uid = 0;  // unique id needed for show/hide parent label + input

angular.module('ngFsModules')
       .directive('fsPersonVitals', ['$compile', function($compile) {
  return {
    restrict: 'E',
    replace: true,
    template: getTemplateStr('fsPersonVitals'),
    scope: {
      person: '=',
      config: '&',
    },
    link: function(scope, element, attrs) {
      scope.options = scope.config() || {};

      scope.uid = uid++;

      scope = fsPersonVitalsViewModel(scope, true);

      scope.$watch('person', function fsPersonVitalsWatchAction() {
        scope = fsPersonVitalsViewModel(scope, true);

        // add parents in the link function since Angular will get into
        // an infinite state if it is added to the DOM (even behind and ng-if).
        // This implies that Angular tries to parse the entire DOM tree before it
        // does any ng calculations.
        if (scope.options.showParents && scope.person.parents) {
          var parents = $compile('<fs-couple-info data-husband="person.parents.father" data-wife="person.parents.mother" data-config="{showParents: false, iconSize: \'small\'}"></fs-couple-info>')(scope);
          element.find('.fs-person__fs-person-parents').append(parents);
        }
      });
    }
  };
}]);