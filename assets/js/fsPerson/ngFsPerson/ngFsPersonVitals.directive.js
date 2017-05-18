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
        if (scope.person && scope.person.name && scope.options.nameWrapper) {
          $timeout(function(){
            var pidWrapper = element.find('[data-fs-add-wrapper-if][title]');
            var nameContainer = element.find('.fs-person-vitals__name')[0];

            // OFT-69190 - Fix name not properly re-rendering. Passive placeholder data is not being overwritten by active data coming back from endpoints.
            var displayedName = element.find('.fs-person-vitals__name-full')[0] ? element.find('.fs-person-vitals__name-full')[0].innerHTML: '';
            // If the name being rendered is not the name that should be rendered, replace it.
            if (displayedName !== scope.person.name) {
              // Display the name in the full-name span.
              element.find('.fs-person-vitals__name-full')[0].innerHTML = scope.person.name;
              // Check if there's a wrapper with data-cmd-data and update it to match.
              var anchorWrapper = element.find('.fs-person-vitals__name a')[0];
              if (anchorWrapper && anchorWrapper.hasAttribute('data-cmd-data')) {
                var cmdData = JSON.parse(anchorWrapper.getAttribute('data-cmd-data'));
                cmdData.name = scope.person.name;
                anchorWrapper.setAttribute('data-cmd-data', JSON.stringify(cmdData));
              }
            }

            var wrap = '<' + scope.options.nameWrapper + ' class="fs-person-vitals__name ' + scope.nameConclusionStyle + '" style="padding:0; margin:0;">' + nameContainer.innerHTML + '</' + scope.options.nameWrapper + '>';

            if (pidWrapper.find('.fs-person-vitals__name')[0]) {
              pidWrapper.find('.fs-person-vitals__name').replaceWith($(wrap));
            } else {
              //Hack for race condition. About 10% of the time, the name will be placed as a sibling to the pid wrapper instead of as a child to it. This is to help remedy that.
              setTimeout(function(){
                // Check again for the name
                if (pidWrapper.find('.fs-person-vitals__name')[0]) {
                  pidWrapper.find('.fs-person-vitals__name').replaceWith($(wrap));
                } else {
                  // Manually move the nameContainer into the wrapper
                  nameContainer.parentNode.removeChild(nameContainer);
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
