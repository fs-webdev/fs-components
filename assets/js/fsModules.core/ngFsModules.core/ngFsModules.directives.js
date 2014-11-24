/**
 * Angular directives common to all angular modules.
 * @author Steven Lambert <steven.lambert@familysearch.com>
 * @team tree - tesseract
 * @version 1.1.0
 */

/**
 * Conditionally add the wrapper element if the expression results to true, otherwise replace the
 * element with it's children.
 * @see {@link https://github.com/angular/angular.js/blob/v1.2.16/src/ng/directive/ngIf.js|ngIf}
 *
 * @since 1.0.3
 */
angular.module('ngFsModules')
       .directive('fsAddWrapperIf', ['$animate', function($animate) {
  return {
    transclude: 'element',
    priority: 1000,
    restrict: 'A',
    $$tlb: true,
    link: function ($scope, $element, $attr, ctrl, $transclude) {
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

        childScope = $scope.$new();

        // add the wrapper
        if (value) {
          $transclude(childScope, function (clone) {
            childElement = clone;
            $animate.enter(clone, $element.parent(), $element);
          });
        }
        // remove the wrapper
        else {
          $transclude(childScope, function (clone) {
            // https://github.com/fs-webdev/fs-modules/issues/15
            // save the reference to the children so that $animate.leave removes them and not the
            // parent element (which becomes detached from the children after replaceWith)
            childElement = clone.children();
            $animate.enter(clone, $element.parent(), $element, function() {
              clone.replaceWith(clone.children());
            });
          });
        }
      });
    }
  };
}]);