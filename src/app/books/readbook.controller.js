/**
 * Created by Administrator on 2015/11/7.
 */
(function () {
  'use strict';

  angular
    .module('storyToaster')
    .controller('ReadbookController', ReadbookController);

  /* @ngInject */
  function ReadbookController($scope, $timeout,relayService) {
    var vm = this;
    activate();

    var temp = relayService.getKeyValue('_selectedBook_') && relayService.getKeyValue('_selectedBook_').data;
    vm.book = temp ? JSON.parse(relayService.getKeyValue('_selectedBook_').data) : null;
    vm.addImage = addImage;

    var finishedPages = 0 ;
    var finishedOpenBookRender = false;

    //$timeout( documentReady );

    $scope.$on('onPageAfterRender',function(){
      finishedPages = finishedPages + 1;
      console.log('finished pages=' +finishedPages);

      if(finishedOpenBookRender && finishedPages >= vm.book.pages.length + 4 )
        documentReady();

    });

    $scope.$on('onOpenBookAfterRender', function(){

      console.log('onOpenBookAfterRender, finished pages=' +finishedPages);

      finishedOpenBookRender = true;

      if(finishedOpenBookRender && finishedPages >= vm.book.pages.length + 4 )
      documentReady();
    });
    //angular.element(document).ready(documentReady);
    ////////////////

    function activate() {
    }

    function addImage(){

    }

    function documentReady(){
      console.log('ready from readbook controller');
      //
      //$('#features').wowBook({
      //  width :    500*2
      //  ,height  :500 /1.375
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
      //  console.log('size');
      //  var factor = 0.02*( $(this).index() ? -1 : 1 );
      //  book.opts.thumbnailScale = book.opts.thumbnailScale + factor;
      //  rebuildThumbnails();
      //})

    }
  }

})();


