(function () {
  'use strict';

  angular
    .module('storyToaster')
    .directive('bookDisplay', bookDisplay);

  bookDisplay.$inject = ['$window','relayService'];

  /* @ngInject */
  function bookDisplay($window,relayService) {
    var directive = {
      //bindToController: true,
      link: link,
      restrict: 'AE',
      scope: {
        'book': '='
      },
      templateUrl: 'app/books/mybooks.html'
    };
    return directive;

    function link(scope, element, attrs) {
      console.log('in book display')
      if (attrs) {
        scope.$eval(attrs.afterRender)
      }

      var backButton = angular.element('#btnGoBack');
      if (backButton) {
        backButton.bind('click', function () {

          $window.location.assign('/account/mybooks');
        })
      }

        //$('#features').wowBook({
        //  height : 375
        //  ,width  : 1032
        //  ,centeredWhenClosed : true
        //  ,hardcovers : true
        //  ,turnPageDuration : 1000
        //  ,numberedPages : [1,-2]
        //  ,controls : {
        //    zoomIn    : '#zoomin',
        //    zoomOut   : '#zoomout',
        //    next      : '#next',
        //    back      : '#back',
        //    first     : '#first',
        //    last      : '#last',
        //    slideShow : '#slideshow',
        //    flipSound : '#flipsound',
        //    thumbnails : '#thumbs',
        //    fullscreen : '#fullscreen'
        //  }
        //  ,scaleToFit: "#container"
        //  ,thumbnailsPosition : 'bottom'
        //  ,onFullscreenError : function(){
        //    var msg="Fullscreen failed.";
        //    if (self!=top) msg="The frame is blocking full screen mode. Click on 'remove frame' button above and try to go full screen again."
        //    alert(msg);
        //  }
        //}).css({'display':'none', 'margin':'auto'}).fadeIn(1000);
        //
        //$("#cover").click(function(){
        //  $.wowBook("#features").advance();
        //});
        //
        //var book = $.wowBook("#features");
        //
        //function rebuildThumbnails(){
        //  book.destroyThumbnails()
        //  book.showThumbnails()
        //  $("#thumbs_holder").css("marginTop", -$("#thumbs_holder").height()/2)
        //}
        //$("#thumbs_position button").on("click", function(){
        //  var position = $(this).text().toLowerCase()
        //  if ($(this).data("customized")) {
        //    position = "top"
        //    book.opts.thumbnailsParent = "#thumbs_holder";
        //  } else {
        //    book.opts.thumbnailsParent = "body";
        //  }
        //  book.opts.thumbnailsPosition = position
        //  rebuildThumbnails();
        //})
        //$("#thumb_automatic").click(function(){
        //  book.opts.thumbnailsSprite = null
        //  book.opts.thumbnailWidth = null
        //  rebuildThumbnails();
        //})
        //$("#thumb_sprite").click(function(){
        //  book.opts.thumbnailsSprite = "images/thumbs.jpg"
        //  book.opts.thumbnailWidth = 136
        //  rebuildThumbnails();
        //})
        //$("#thumbs_size button").click(function(){
        //  var factor = 0.02*( $(this).index() ? -1 : 1 );
        //  book.opts.thumbnailScale = book.opts.thumbnailScale + factor;
        //  rebuildThumbnails();
        //});


        scope.$emit('onAfterRender');
    }
  }
})();




