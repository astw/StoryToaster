(function () {
  'use strict';

  angular
    .module('storyToaster')
    .directive('frontCoverDesign', frontCoverDesign);


  /* @ngInject */
  function frontCoverDesign() {

    var t = ($('#bigPagePanel')).width();
    var w = (t - 20) / 2;
    var h = w / 1.375;

    var directive = {
      link: link,
      restrict: 'AE',
      //template: template,
      templateUrl: 'app/main/template/front-cover-design.html'
    };
    return directive;

    function link(scope, elem, attrs) {

      $(".front-cover-left").css('height', h + "px");
      $(".front-cover-left").css('width', w + "px");

      var picture = {};
      picture.width = w * 0.6;
      picture.height = h * 0.6;
      picture.x = (w - picture.width ) / 2;
      picture.y = (h - picture.height) / 2;

      var canvasWidth = w -14;
      var canvasHeight = h -14;

      var canvas = new fabric.Canvas('frontCoverCanvas', {selection: false});
      canvas.setWidth(canvasWidth);
      canvas.setHeight(canvasHeight);

      scope.main.frontCoverCanvas = canvas;

      //set title and attribute
      var title = addBookTitle(canvas);
      var attribute = addAttribute(canvas, picture);


      var imageUrl = "http://localhost:3000/assets/images/1.gif";

      //set image
      addPicture(canvas, imageUrl, picture);

      //set monitor
      addMonitors(scope,canvas,title, attribute, picture,canvasWidth, canvasHeight);

      scope.$emit('onAfterRender');
    }

    function addAttribute(canvas, picture) {

      var top = picture.y + picture.height + 20;

      console.log(top);
      var attribute = new fabric.Text('By author', {
        fontSize: 20,
        fontFamily: 'Comic Sans',
        fontWeight: 'bold',
        lockRotation: true,
        lockMovement: true,
        selection: false,
        hasControls: false,
        hasBorders: false,
        cornersize: 0,
        originX: 'center',
        top: top,
        left: 0

      });

      canvas.add(attribute);
      attribute.centerH();
      attribute.bringToFront();

      return attribute;
    }

    function addBookTitle(canvas) {

      var title = new fabric.Text('this is a book', {
        fontSize: 30,
        fontFamily: 'Comic Sans',
        fontWeight: 'bold',
        lockRotation: true,
        lockMovement: true,
        selection: false,
        hasControls: false,
        hasBorders: false,
        cornersize: 0,
        originX: 'center',
        top: 30
      });

      canvas.add(title);
      title.centerH();
      return title;
    }

    function addPicture(canvas, imageUrl, picture, canvasWidth, canvasHeight) {

      if (!imageUrl) return;

      fabric.Image.fromURL(imageUrl, function (img) {

        canvas.add(img.set({
          left: picture.x,
          top: picture.y,
          width: picture.width,
          height: picture.height,

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
        }));

        canvas.setActiveObject(canvas.item(2));
        canvas.item(2).selectable = false;
        img.bringToFront();

      }, {crossOrigin: 'Anonymous'});
    }

    function addMonitors(scope, canvas, title, attribute, picture,canvasWidth, canvasHeight) {

      scope.$watch(
        function () {
          return scope.main.PhotoBook.title;
        },

        function (newValue, oldValue) {
          title.text = newValue;
          canvas.renderAll();
        });

      scope.$watch(
        function () {
          return scope.main.PhotoBook.titleColor;
        },

        function (newValue, oldValue) {
          title.setColor(newValue);
          canvas.renderAll();
        });

      scope.$watch(
        function () {
          return scope.main.PhotoBook.attribute;
        },

        function (newValue, oldValue) {
          attribute.text = newValue;
          canvas.renderAll();
        });

      scope.$watch(
        function () {
          return scope.main.PhotoBook.attributeColor;
        },

        function (newValue, oldValue) {
          attribute.setColor(newValue);
          canvas.renderAll();
        });

      scope.$watch(
        function () {
          return scope.main.PhotoBook.frontCoverImageIndex;
        },

        function (newValue) {

          if (newValue) {
            canvas.item(2).remove();

            canvas.setWidth(canvasWidth);
            canvas.setHeight(canvasHeight);

            var imageData = scope.main.PhotoBook.pages[newValue].previewImage;
            addPicture(canvas, imageData, picture, canvasWidth, canvasHeight);
          }
        }
      )
    }
  }


})();




