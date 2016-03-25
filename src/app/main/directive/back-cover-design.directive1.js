
(function () {
  'use strict';

  angular
    .module('storyToaster')
    .directive('backCoverDesign1', backCoverDesign);

  fabric.Canvas.prototype.getItemByName = function(name) {
    var object = null,
      objects = this.getObjects();

    for (var i = 0, len = this.size(); i < len; i++) {
      if (objects[i].name && objects[i].name === name) {
        object = objects[i];
        break;
      }
    }

    return object;
  };


  /* @ngInject */
  function backCoverDesign() {

    var page;
    var canvas;

    var directive = {
      templateUrl:"app/main/template/back-cover-design.html",
      link: link,
      restrict: 'AE'
    };
    return directive;

    function link(scope, elem, attrs) {
      page = scope.main.PhotoBook.backCover;
      var t = ($('#bigPagePanel')).width();
      var w = (t - 20) / 2;
      var h = w / 1.375;

      $(".front-cover-left").css('height', h + "px");
      $(".front-cover-left").css('width', w + "px");

      var picture = {};
      picture.width = w * 0.6;
      picture.height = h * 0.6;
      picture.x = (w - picture.width ) / 2;
      picture.y = (h - picture.height) / 2 -20;

      var canvasWidth = w -10;
      var canvasHeight = h -10;

      canvas = new fabric.Canvas(
        'frontCoverCanvasRight',
        {
          selection: false,
          backgroundColor: scope.main.PhotoBook.backgroundColor
        }
      );
      canvas.setWidth(canvasWidth);
      canvas.setHeight(canvasHeight);

      scope.main.backCoverCanvas = canvas;

      // add log pic
      var logPic ={};
      logPic.y = picture.y + picture.height;
      logPic.url = "http://localhost:3000/assets/images/logo-cloud.png";
      addLogPicture(scope, canvas, logPic);

      picture.url = "http://localhost:3000/assets/images/blank.gif";
      //set image
      addPicture(scope, canvas, picture);

      //set monitor
      addMonitors(scope, canvas, picture,canvasWidth, canvasHeight);

      scope.$emit('onAfterRender');
    }

    function addLogPicture(scope, canvas, picture) {

      if (!picture.url) return;

      fabric.Image.fromURL(picture.url, function (img) {

        img = setImageProperties(img);
        img.top = picture.y ;
        img.name="logPic";

        canvas.add(img);
        img.centerH();
        canvas.setActiveObject(img);
        img.selectable = false;
        img.bringToFront();

      }, {crossOrigin: 'Anonymous'});
    }

    function addPicture(scope, canvas, picture) {

      if (!picture.url) return;

      fabric.Image.fromURL(picture.url, function (img) {

        img = setImageProperties(img);
        img.set({
          left: picture.x,
          top: picture.y,
          width: picture.width,
          height: picture.height
        });
        img.name="backCoverIage";

        canvas.add(img);
        canvas.setActiveObject(img);
        img.selectable = false;

        img.centerH();
        img.bringToFront();

        //create preview image
        scope.$emit("pageChanged",{
          page:scope.main.PhotoBook.backCover,
          canvas:canvas
        });

      }, {crossOrigin: 'Anonymous'});
    }

    function setImageProperties(image){

      image.set({
        hasControls: false,
        //cornerColor: 'green',cornerSize: 16,transparentCorners: false,
        selection: false,
        lockRotation: true,
        lockMovement: true,   //lockMovementY: false,lockMovementX: false,
        //lockUniScaling: false,lockScalingY:false, lockScalingX:false,
        hoverCursor: 'default',
        hasRotatingPoint: false,
        hasBorders: true, borderColor: 'white', borderSize: 2,
        transparentBorder: false,
        angle: 0,
        cornersize: 10
      });

      return image;
    }

    function addMonitors(scope, canvas, picture,canvasWidth, canvasHeight) {

      scope.$watch(
        function () {
          return scope.main.PhotoBook.backgroundColor;
        },

        function (newValue, oldValue) {
          canvas.backgroundColor = newValue;
          canvas.renderAll();

          scope.$emit('pageChanged',{canvas:canvas,page:page});
        });

      scope.$watch(
        function () {
          return scope.main.PhotoBook.backCoverImageIndex;
        },

        function (newValue) {

          if (newValue && newValue >= 0) {
            var backCoverImage = canvas.getItemByName('backCoverImage');

            if(backCoverImage)
              backCoverImage.remove();

            canvas.setWidth(canvasWidth);
            canvas.setHeight(canvasHeight);

            var imageData = scope.main.PhotoBook.pages[newValue].previewImage;
            picture.url = imageData;

            //set image
            addPicture(scope, canvas, picture);
          }
        }
      )
    }
  }
})();

