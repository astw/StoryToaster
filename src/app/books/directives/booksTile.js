(function () {
  'use strict';

  angular
    .module('storyToaster')
    .directive('bookTile', bookTile);

  /* @ngInject */
  function bookTile($location,$window,relayService,$timeout) {
    var directive = {
      //bindToController: true,
      //controller:'BookController',
      //controllerAs: 'bookCtrl',
      link: link,
      restrict: 'AE',
      scope: {
        'book': '=',
        'index':'=',
        'previewData':'='
      },
      templateUrl: 'app/books/templates/book-tile.html'
    };
    return directive;

    function link(scope, element, attrs) {
      var data = scope.book.frontCover;

      var canvasEle = element.find('canvas')[0];
      //var id = "canvas_" + scope.vm.data.index;
      var id = "canvas_" + scope.index ;
      canvasEle.id = id;

      //set canvasEle size
      canvasEle.width = scope.book.frontCover.width;
      canvasEle.height =scope.book.frontCover.height;

      var canvas = new fabric.Canvas(
        id,
        {select:false,background:'red'}
      );

      if(data && data.previewImage)
        scope.book.frontCover.previewImage = data.previewImage;
    }
  }

})();



