(function () {
  'use strict';

  angular
    .module('storyToaster')
    .directive('topBarCommand', topBarCommand);

  /* @ngInject */
  function topBarCommand() {
    var directive = {
      templateUrl: 'app/main/template/topCommandBar.html',
      link: link,
      restrict: 'A'
    };
    return directive;

    function link(scope, element, attrs) {

    }
  }

})();


