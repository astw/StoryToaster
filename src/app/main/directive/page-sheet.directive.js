(function () {
  'use strict';

  angular
    .module('storyToaster')
    .directive('pageSheet', pageSheet);

  /* @ngInject */
  function pageSheet() {
    var directive = {
      templateUrl: 'app/main/template/page-sheet.html',
      link: link,
      restrict: 'A'
    };
    return directive;

    function link(scope, element, attrs) {

    }
  }
})();


