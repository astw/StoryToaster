(function () {
  'use strict';

  angular
    .module('storyToaster')
    .directive('bookTile', bookTile);

  bookTile.$inject = ['$location','$window','relayService'];

  /* @ngInject */
  function bookTile($location,$window,relayService) {
    var directive = {
      //bindToController: true,
      //controller:'BookController',
      //controllerAs: 'bookCtrl',
      link: link,
      restrict: 'AE',
      scope: {
        'book': '=',
        'index':'='
      },
      templateUrl: 'app/books/templates/book-tile.html'
    };
    return directive;

    function link(scope, element, attrs) {

      if (attrs) {
        scope.$eval(attrs.afterRender)
      }

      //element.bind('click',function(){
      //  console.log(scope.parent.bookCtrl.mybooks);
      //  scope.parent.bookCtrl.mybooks.splice(0,1);
      //  console.log(scope.bookCtrl.mybooks);
      //})
      scope.$emit('onAfterRender');

    }
  }


})();



