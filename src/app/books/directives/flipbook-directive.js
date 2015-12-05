(function () {
  'use strict';

  //templateUrl: "app/books/templates/flipbook.html"

  angular
    .module('storyToaster')
    .directive('flipbook', flipbook);
  /* @ngInject */
  function flipbook( ) {
    return{
      restrict: 'E',
      link: function(scope, element, attrs){

      },

      templateUrl: "app/books/templates/flipbook.html"
    }
  }

})();

