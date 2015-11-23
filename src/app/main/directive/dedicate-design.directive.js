(function () {
  'use strict';

  angular
    .module('storyToaster')
    .directive('dedicateDesign', dedicateDesign);


  /* @ngInject */
  function dedicateDesign() {

    var page;
    var canvas;

    var t = ($('#bigPagePanel')).width();
    var w = (t - 20) / 2;
    var h = w / 1.375;

    var directive = {
      link: link,
      restrict: 'AE',
      //template: template,
      templateUrl: 'app/main/template/dedicate-design.html'
    };
    return directive;

    function link(scope, elem, attrs) {
      page = scope.main.PhotoBook.dedicatedPage;

      var picture = {};
      picture.width = 100;
      picture.height = 60;

      picture.y = h - 140;

      var canvasWidth = w - 14;
      var canvasHeight = h - 14;

      canvas = new fabric.Canvas(
        'dedicatePageCanvas',
        {
          selection: false,
          backgroundColor: '#ffffff'
        }
      );

      canvas.setWidth(canvasWidth);
      canvas.setHeight(canvasHeight);

      scope.main.dedicatePageCanvas = canvas;

      var dedication = addBookDedication(scope);

      var attribute = addAttribute(scope, picture);

      picture.url = "http://localhost:3000/assets/images/logo-cloud.png";

      //set image
      addPicture(scope, picture);

      //set monitor
      addMonitors(scope, dedication, attribute, picture, canvasWidth, canvasHeight);
      fireChangeEvent(scope);

      scope.$emit('onAfterRender');
    }

    function addAttribute(scope, picture) {

      var top = picture.y + picture.height + 20;

      console.log(top);
      var attribute = new fabric.Text('The book was created and published on StoryToaster，' +
        '\r\n 故事大王网络公司版权所有©' +
        '\r\n www.storytoaster.com', {
        fontSize: 14,
        fontFamily: 'Arial Narrow',
        fontWeight: '70',
        lockRotation: true,
        lockMovement: true,
        selection: false,
        hasControls: false,
        hasBorders: false,
        cornersize: 0,
        originX: 'center',
        top: h - 180 + 80,
        left: 0,
        textAlign:'center'
      });

      canvas.add(attribute);
      attribute.centerH();
      attribute.bringToFront();
      attribute.setColor('#999999');

      fireChangeEvent(scope);

      return attribute;
    }

    function addBookDedication(scope) {

      var dedication = new fabric.Text('输入题记', {
        fontSize: 14,
        fontFamily: 'Comic Sans',
        fontWeight: '400',
        lockRotation: true,
        lockMovement: true,
        selection: false,
        hasControls: false,
        hasBorders: false,
        cornersize: 0,
        originX: 'center',
        top: 60,
        textAlign:'center',
        color:'#cccccc'
      });

      canvas.add(dedication);
      dedication.centerH();

      fireChangeEvent(scope);

      return dedication;
    }

    function addPicture(scope, picture, canvasWidth, canvasHeight) {

      if (!picture.url) return;

      fabric.Image.fromURL(picture.url, function (img) {

        canvas.add(img.set({

          top: h - 160,
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
        img.centerH();
        img.bringToFront();

        fireChangeEvent(scope);

      }, {crossOrigin: 'Anonymous'});
    }

    function fireChangeEvent(scope) {
      scope.$emit('pageChanged', {canvas: canvas, page: page});
    }

    function addMonitors(scope, dedication, attribute, picture, canvasWidth, canvasHeight) {

      scope.$watch(
        function () {
          return scope.main.PhotoBook.dedicationText;
        },

        function (newValue, oldValue) {
          dedication.text = newValue;
          canvas.renderAll();

          fireChangeEvent(scope);
        });

      scope.$watch(
        function () {
          return scope.main.PhotoBook.dedicationColor;
        },

        function (newValue, oldValue) {
          dedication.setColor(newValue);
          canvas.renderAll();

          fireChangeEvent(scope);
        });
    }
  }

})();




