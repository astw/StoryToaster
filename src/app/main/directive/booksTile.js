(function () {
  'use strict';

  angular
    .module('storyToaster')
    .directive('bookTile', bookTile);

  bookTile.$inject = [];

  /* @ngInject */
  function bookTile() {
    var directive = {
      //bindToController: true,
      link: link,
      restrict: 'AE',
      scope: {
        'book':'='
      },
      templateUrl:'app/main/template/book-tile.html'
    };
    return directive;

    function link(scope, element, attrs) {

    }
  }


})();



