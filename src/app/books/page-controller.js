/**
 * Created by Administrator on 2015/11/7.
 */
(function () {
  'use strict';

  angular
    .module('storyToaster')
    .controller('PageController', PageController);

  PageController.$inject = [];

  /* @ngInject */
  function PageController() {
    var vm = this;
    activate();

    console.log('=-------------------- in page-controller ');

    console.log(vm.canvas_1)

    vm.addImage = addImage;
    ////////////////

    function activate() {
    }

    function addImage(){
      var imageUrl = "http://localhost:3000/assets/images/1.gif" ;

      var canvas = new fabric.Canvas('canvas_1');

      fabric.Image.fromURL(imageUrl, function (img) {
        canvas.add(img);
      }, {crossOrigin: 'Anonymous'});


      var rect = new fabric.Rect({
        left: 100,
        top: 100,
        fill: 'red',
        width: 20,
        height: 20
      });

      canvas.add(rect);
    }
  }

})();


