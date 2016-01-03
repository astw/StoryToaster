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

    //$timeout( documentReady );
    $scope.$on('onOpenBookAfterRender',documentReady);
    //angular.element(document).ready(documentReady);
    ////////////////

    function activate() {
    }

    function addImage(){

    }

    function documentReady(){
      console.log('ready from readbook controller');

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

    }
  }

})();


