(function () {
  'use strict';

  angular
    .module('storyToaster')
    .directive('navBar2', navBar);


  /* @ngInject */
  function navBar() {
    var directive = {
      templateUrl: 'app/components/navbar/navbar-2.html',
      link: link,
      restrict: 'A',
    };
    return directive;

    function link(scope, element, attrs) {

    }
  }

})();


