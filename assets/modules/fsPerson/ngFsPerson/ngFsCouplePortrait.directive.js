/**
 * Render a couple's portraits with their genders and vitals (name, lifeSpan, id, and birthplace).
 *
 * @since 1.1.0
 */
angular.module('ngFsModules')
       .directive('fsCouplePortrait', function() {

  return {
    restrict: 'E',
    replace: true,
    template: templateList.fsCouplePortrait,
    scope: {
      spouse1: '=',
      spouse2: '=',
      config: '&'
    },
    link: function(scope, element, attrs) {
      scope.options = scope.config() || {};
      scope.$watch('spouse1', function fsCouplePortraitSpouse1WatchAction() {
        scope = fsCouplePortraitViewModel(scope);
      });
      scope.$watch('spouse2', function fsCouplePortraitSpouse2WatchAction() {
        scope = fsCouplePortraitViewModel(scope);
      });
    },
    compile: function(tElement, tAttrs) {
      // since data-config must be a string, we need to append the attrs string to fs-person-gender
      tElement.find('fs-person-portrait').attr('data-config', tAttrs.config);
      return this.link;
    }
  };  
});