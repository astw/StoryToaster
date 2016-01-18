(function () {
  'use strict';

  angular
    .module('storyToaster')
    .directive('materialSection', materialSection);

  /* @ngInject */
  function materialSection($timeout) {
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

      $timeout( documentReady );

      function documentReady() {
        Core.init();
      }

    }
  }

})();

