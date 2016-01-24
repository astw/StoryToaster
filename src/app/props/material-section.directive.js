(function () {
  'use strict';

  angular
    .module('storyToaster')
    .directive('materialSection', materialSection);

  /* @ngInject */
  function materialSection($timeout,$window) {
    var directive = {
      templateUrl:'app/props/materials.html',
      bindToController: true,
      controller: "MaterialController",
      controllerAs: 'material',
      transclude: true,
      link: link,
      restrict: 'AE',
      scope: {
        sgroup:'='
      }
    };
    return directive;

    function link(scope, element, attrs) {

      scope.onResize = function () {

        var h = ($('#bigPagePanel')).height() -80 ;
        $('.left_panel').height(h);
      }

      $timeout( documentReady );

      function documentReady() {
        Core.init();
      }
      scope.onResize();
      angular.element($window).bind('resize', function () {
        scope.onResize();
      })

    }
  }

})();

