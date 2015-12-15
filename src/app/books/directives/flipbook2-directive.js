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
        var book = $('#flipbook');

        //for(var i=0; i< scope.bookvm.book.pages.length; i++){
        //  var pg = scope.bookvm.book.pages[i];
        //  //element = $("<div />").html('<page  data="bookvm.book.pages['+ i + ']" id=' + i +'   />');
        //  element = $("<div/>").html("loading");
        //
        //  $("#flipbook").turn("addPage", element, 3+i);
        //
        //}

        $('#flipbook').turn({
          width: '1000px',
          height: '460px',
          pages: 8
        });



        $('#flipbook').turn('peel', 'br');
      },

      templateUrl: "app/books/templates/flipbook2.html"
    }
  }

})();

