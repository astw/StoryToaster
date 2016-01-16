(function () {
  'use strict';

  angular
    .module('storyToaster')
    .directive('sideBarLeft', sideBarLeft);

  /* @ngInject */
  function sideBarLeft() {
    var directive = {
      templateUrl: 'app/components/sidebar/leftSidebar.html',
      link: link,
      restrict: 'AE'
    };
    return directive;

    function link(scope, element, attrs) {

    }
  }

})();


