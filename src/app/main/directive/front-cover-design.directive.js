(function () {
  'use strict';

  angular
    .module('storyToaster')
    .directive('frontCoverDesign', frontCoverDesign);


  /* @ngInject */
  function frontCoverDesign() {

    var page;
    var canvas;

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
      page = scope.main.PhotoBook.frontCover;

      $(".front-cover-left").css('height', h + "px");
      $(".front-cover-left").css('width', w + "px");

      var picture = {};
      picture.width = w * 0.6;
      picture.height = h * 0.6;
      picture.x = (w - picture.width ) / 2;
      picture.y = (h - picture.height) / 2;

      var canvasWidth = w - 10;
      var canvasHeight = h - 10;

      scope.main.PhotoBook.frontCover.width = canvasWidth;
      scope.main.PhotoBook.frontCover.height = canvasHeight;

      canvas = new fabric.Canvas(
        'frontCoverCanvas',
        {
          selection: false,
          backgroundColor: scope.main.PhotoBook.backgroundColor
        }
      );

      canvas.setWidth(canvasWidth);
      canvas.setHeight(canvasHeight);

      scope.main.frontCoverCanvas = canvas;

      console.log('------- in font-conver-design directive ------');
      console.log('---------- scope.main.PhotoBook.id', scope.main.PhotoBook.id);
      if (!scope.main.PhotoBook.id) {

        //set title and attribute
        var title = addBookTitle(scope);
        var attribute = addAttribute(scope, picture);
        picture.url = "http://localhost:3000/assets/images/blank.jpg";

        //set image
        addPicture(scope, picture);
      }


      //set monitor
      addMonitors(scope, title, attribute, picture, canvasWidth, canvasHeight);
      fireChangeEvent(scope);

      scope.$emit('onAfterRenderForFrontCover');
    }

    function addAttribute(scope, picture) {

      var top = picture.y + picture.height + 20;

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

      fireChangeEvent(scope);

      return attribute;
    }

    function addBookTitle(scope) {

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

      fireChangeEvent(scope);

      return title;
    }

    function addPicture(scope, picture, canvasWidth, canvasHeight) {

      if (!picture.url) return;

      fabric.Image.fromURL(picture.url, function (img) {

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

        fireChangeEvent(scope);

      }, {crossOrigin: 'Anonymous'});
    }

    function fireChangeEvent(scope){
      scope.$emit('pageChanged',{canvas:canvas,page:page});
    }

    function addMonitors(scope, title, attribute, picture,canvasWidth, canvasHeight) {

      scope.$watch(
        function () {
          return scope.main.PhotoBook.backgroundColor;
        },

        function (newValue, oldValue) {
          canvas.backgroundColor = newValue;
          canvas.renderAll();

          fireChangeEvent(scope);
        });

      scope.$watch(
        function () {
          return scope.main.PhotoBook.title;
        },

        function (newValue, oldValue) {
          title.text = newValue;
          canvas.renderAll();

          fireChangeEvent(scope);
        });

      scope.$watch(
        function () {
          return scope.main.PhotoBook.titleColor;
        },

        function (newValue, oldValue) {
          title.setColor(newValue);
          canvas.renderAll();

          fireChangeEvent(scope);
        });

      scope.$watch(
        function () {
          return scope.main.PhotoBook.attribute;
        },

        function (newValue, oldValue) {
          attribute.text = newValue;
          canvas.renderAll();

          fireChangeEvent(scope);
        });

      scope.$watch(
        function () {
          return scope.main.PhotoBook.attributeColor;
        },

        function (newValue, oldValue) {
          attribute.setColor(newValue);
          canvas.renderAll();

          fireChangeEvent(scope);
        });

      scope.$watch(
        function () {
          return scope.main.PhotoBook.frontCoverImageIndex;
        },

        function (newValue, oldValue) {

          if (newValue >= 0) {
            if(canvas.item(2))
            canvas.item(2).remove();

            canvas.setWidth(canvasWidth);
            canvas.setHeight(canvasHeight);

            if(scope.main.PhotoBook.pages.length > newValue) {
              picture.url = scope.main.PhotoBook.pages[newValue].previewImage;
              addPicture(scope, picture, canvasWidth, canvasHeight);
            }
          }
        }
      )
    }
  }

})();




