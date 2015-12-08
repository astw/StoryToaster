/**
 * Created by Administrator on 2015/12/5.
 */
(function () {
  'use strict';

  //templateUrl: "app/books/templates/flipbook.html"

  angular
    .module('storyToaster')
    .directive('flipbook2', flipbook);
  /* @ngInject */
  function flipbook( ) {
    return{
      restrict: 'E',
      scope: {
        'book': '='
      },

      bindToController: true,
      controller: 'BookController',
      controllerAs: 'bookvm',

      link: function(scope, element, attrs){
        $('#flipbook').turn({
          width: '1000px',
          height: '460px',
          pages: 6
        });

        $('#flipbook').turn('peel', 'br');
      },

      templateUrl: "app/books/templates/flipbook2.html"
    }
  }

})();

