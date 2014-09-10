/**
 * Angular directives for rendering a person.
 * @author Steven Lambert <steven.lambert@familysearch.com>
 * @team tree - tesseract
 * @version 1.0.0
 */

/*
 * Since passing an object from one directive to a child directive via data
 * attributes doesn't work so well, use data-config to pass a config object
 * to the directive and then assign `scope.options = scope.config() || {}`.
 * If a child directive needs the same options add the data-config attribute
 * to the directive in the link function and set it to the data-config attribute.
 */
angular.module('ngFsModules', ['ngSanitize'])

/**
 * Conditionally add the wrapper element if the expression results to true, otherwise replace the element with it's children.
 * Functionality modeled after ngIf from Angularjs 1.2.0-rc.2 since that is the version of Angularjs we are using in tree.
 * @see {@link https://github.com/angular/angular.js/blob/v1.2.0-rc.2/src/ng/directive/ngIf.js|ngIf}
 *
 * @since 1.0.2
 */
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
}])

/**
 * Render a persons vitals.
 *
 * @since 1.0.0
 */
.directive('fsPersonVitals', ['$compile', function($compile) {
  return {
    restrict: 'E',
    replace: true,
    template: templateList.personVitals,
    scope: {
      person: '=',
      config: '&',
    },
    link: function(scope, element, attrs) {
      scope.options = scope.config() || {};
      scope.lang = lang;
    }
  };
}])

/**
 * Render a persons gender and vitals.
 *
 * @since 1.0.0
 */
.directive('fsPersonGender', function() {
  return {
    restrict: 'E',
    replace: true,
    template: templateList.personGender,
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
})

/**
 * Render a persons portrait, gender, and vitals.
 *
 * @since 1.0.0
 */
.directive('fsPersonPortrait', function() {
  return {
    restrict: 'E',
    replace: true,
    template: templateList.personPortrait,
    scope: {
      person: '=',
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
})

/**
 * Render a couple.
 *
 * @since 1.0.0
 */
.directive('fsCoupleInfo', function() {
  return {
    restrict: 'E',
    replace: true,
    template: templateList.coupleInfo,
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