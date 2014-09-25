/**
 * Angular directives common to all angular modules.
 * @author Steven Lambert <steven.lambert@familysearch.com>
 * @team tree - tesseract
 * @version 1.1.0
 */

/**
 * Conditionally add the wrapper element if the expression results to true, otherwise replace the element with it's children.
 * Functionality modeled after ngIf from Angularjs 1.2.0-rc.2 since that is the version of Angularjs we are using in tree.
 * @see {@link https://github.com/angular/angular.js/blob/v1.2.0-rc.2/src/ng/directive/ngIf.js|ngIf}
 *
 * @since 1.0.2
 */
angular.module('ngFsModules')
       .directive('fsAddWrapperIf', ['$animate', function($animate) {
  return {
    transclude: 'element',
    priority: 1000,
    restrict: 'A',
    compile: function (element, attr, transclude) {
      return function ($scope, $element, $attr) {
        var childElement, childScope;
        $scope.$watch($attr.fsAddWrapperIf, function fsAddWrapperIfWatchAction(value) {
          if (childElement) {
            $animate.leave(childElement);
            childElement = undefined;
          }
          if (childScope) {
            childScope.$destroy();
            childScope = undefined;
          }

          // add the wrapper
          if (value) {
            childScope = $scope.$new();
            transclude(childScope, function (clone) {
              childElement = clone
              $animate.enter(clone, $element.parent(), $element);
            });
          }
          // remove the wrapper
          else {
            childScope = $scope.$new();
            transclude(childScope, function (clone) {
              $animate.enter(clone, $element.parent(), $element, function() {
                childElement = clone.contents();
                clone.replaceWith(clone.contents());
              });
            });
          }
        });
      }
    }
  };
}]);