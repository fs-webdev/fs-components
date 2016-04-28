/**
 * Render a person's vitals (name, lifeSpan, and id).
 *
 * @since 1.3.0
 */
var uid = 0;  // unique id needed for show/hide parent label + input

angular.module('ngFsModules')
       .directive('fsPersonVitals', ['$compile', '$timeout', function($compile, $timeout) {
  return {
    restrict: 'E',
    replace: true,
    template: getTemplateStr('fsPersonVitals'),
    scope: {
      person: '=',
      config: '&'
    },
    link: function(scope, element, attrs) {
      scope.options = scope.config() || {};

      scope.uid = uid++;

      scope = fsPersonVitalsViewModel(scope);

      scope.$watch('person', function fsPersonVitalsWatchAction() {
        scope = fsPersonVitalsViewModel(scope);
        scope.openPersonCardCmd = null;

        // add parents in the link function since Angular will get into
        // an infinite state if it is added to the DOM (even behind and ng-if).
        // This implies that Angular tries to parse the entire DOM tree before it
        // does any ng calculations.
        if (scope.options.showParents && scope.person.parents) {
          var parents = $compile('<fs-couple-info data-husband="person.parents.father" data-wife="person.parents.mother" data-config="{showParents: false, iconSize: \'small\'}"></fs-couple-info>')(scope);
          element.find('.fs-person__fs-person-parents').append(parents);
        }

        // Add data-cmd to person's name if option.openPersonCard is true and option.openPersonPage is false.
        if (scope.options.openPersonCard && !scope.options.openPersonPage) {
          scope.openPersonCardCmd = "openPersonCard";
        }

        // Add name-wrapper functionality
        if (scope.person && scope.person.id && scope.options.nameWrapper) {
          $timeout(function(){
            var pidWrapper = element.find('[data-fs-add-wrapper-if][title]');
            var name = element.find('.fs-person-vitals__name')[0];
            var wrap = '<' + scope.options.nameWrapper + ' class="fs-person-vitals__name" data-ng-class="nameConclusionStyle" style="padding:0; margin:0;">' + name.innerHTML + '</' + scope.options.nameWrapper + '>';

            if (pidWrapper.find('.fs-person-vitals__name')[0]) {
              pidWrapper.find('.fs-person-vitals__name').replaceWith($(wrap));
            } else {
              //Hack for race condition. About 10% of the time, the name will be placed as a sibling to the pid wrapper instead of as a child to it. This is to help remedy that.
              setTimeout(function(){
                // Check again for the name
                if (pidWrapper.find('.fs-person-vitals__name')[0]) {
                  pidWrapper.find('.fs-person-vitals__name').replaceWith($(wrap));
                } else {
                  // Manually move the name into the wrapper
                  name.parentNode.removeChild(name);
                  pidWrapper[0].insertBefore($(wrap)[0], pidWrapper.children()[0])
                }
              }, 100);
            }
          },0);
        }
      });
    }
  };
}]);
