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

      // the iconSmall must be set to 'small' when combined with the portrait
      var config = tAttrs.config || '{}';
      var index = config.indexOf('iconSize');

      // append it to the end of the config object
      if (index === -1) {
        var iconSize = 'iconSize: \'small\'';
        if (config.length > 2) {
          iconSize = ',' + iconSize;
        }

        config = config.substring(0, config.length - 1) + iconSize + config.substring(config.length - 1, config.length);
      }
      // replace the previous iconSize
      else {
        config = config.replace(/iconSize:[ ]*['|"](small|long)['|"]/, 'iconSize: \'small\'');
      }

      tAttrs.config = config;

      tElement.find('fs-person-gender').attr('data-config', tAttrs.config);
      return this.link;
    }
  };
});
