(function () {
  'use strict';

  angular
    .module('storyToaster')
    .directive('navBar', navBar);


  /* @ngInject */
  function navBar() {
    var directive = {
      templateUrl: 'app/components/navbar/navbar.html',
      link: link,
      restrict: 'A',
    };
    return directive;

    function link(scope, element, attrs) {

    }
  }

})();


