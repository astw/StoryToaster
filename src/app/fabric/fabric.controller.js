'use strict';


angular.module('storyToaster')
  .controller('fabricTestController', function ($scope,fabricJSExt) {

    fabricJSExt.init();

    /////
    ///// http://jsfiddle.net/3jk3jvy7/

    var canvas = new fabric.Canvas('c');
    //canvas.backgroundColor = 'rgba(0,255,0,0.3)';
    var current = 'color';

    $scope.addText = function(){

     // var txtBox = new fabric.IText ("IText", {
     //   fontSize: 18,
     //   //fontFamily: 'Arial',
     //   //textAlign: 'center',
     //   //width: 120,
     //   //height: 60
     // });
     // canvas.add(txtBox);
     //
     // var txtBox = new fabric.Textbox ("Textbox", {
     //   fontSize: 18,
     //   //fontFamily: 'Arial',
     //   //textAlign: 'center',
     //   //width: 120,
     //   //height: 60
     // });
     // canvas.add(txtBox);
     //
     //
     // var txtBox3 = new fabric.IText(" with boxPath", {
     //   fontSize: 16,
     //   fontFamily: 'Arial',
     //   //textAlign: 'center',
     //   fill: "rgba(255,0,0,0.9)"
     //   //width: 120,
     //   //height: 60
     //   ,boxPath: '/assets/images/callout/callout_circle_right.svg'
     // });
     // canvas.add(txtBox3)
     //
     //
     // var rect  = new fabric.Line([0, 20, 100, 20], {
     //   strokeDashArray: [5, 5],
     //   stroke: 'black'
     // });
     // canvas.add(rect);
     //
     // var rect = new fabric.Rect({
     //   fill: 'transparent',
     //   width: 125,
     //   height: 125,
     //   stroke: 'red',
     //   strokeDashArray: [4, 3]
     // });
     // canvas.add(rect);
     //
     //
     //
     //var  imageIText = new ImageIText ('hi ImageIText,',{
     //   fontSize: 16,
     //   fontFamily: 'Arial',
     //   textAlign: 'center',
     //   //width: 120,
     //   //height: 20,
     //   src:'/assets/images/callout/callout_rounded_rectangle_right.svg'
     //});
     //canvas.add(imageIText);
    //
    var  imageIText = new fabric.ImageTextbox ('hi ImageITextBox,',{
          fontSize: 16,
          fontFamily: 'Arial',
          textAlign: 'center',
          //width: 120,
          //height: 60,
      src:'/assets/images/callout/callout_rounded_rectangle_right.svg'
        });
     canvas.add(imageIText);
    //
    //  var  imageIText = new fabric.ImageTextbox ('hi ImageITextBox,',{
    //    fontSize: 16,
    //    fontFamily: 'Arial',
    //    textAlign: 'center',
    //    //width: 120,
    //    //height: 60,
    //    src:'/assets/images/callout/callout_rectangle_right.svg'
    //  });
    //  canvas.add(imageIText);

    //
    //  var txtBox = new fabric.Textbox("text Box", {
    //    fontSize: 18,
    //    fontFamily: 'Arial',
    //    textAlign: 'center',
    //    minWidth:200,
    //    minHeight:200,
    //    //width: 120,
    //    //height: 60,
    //    boxPath:'/assets/images/callout/callout_rectangle_right.svg'
    // });

    //canvas.add(txtBox);

      //var imageIText = new fabric.BolloonTextbox ('hi BolloonTextbox ,',{
      //  fontSize: 18,
      //  fontFamily: 'Arial',
      //  textAlign: 'center',
      //  //width: 120,
      //  //height: 60,
      //  boxPath:'/assets/images/callout/callout_rectangle_center.svg'
      //});
      //canvas.add(imageIText);

  };

     $scope.changeBackground = function(){
      //if(current === 'color'){
      //  // chnage to image
      //   canvas.setBackgroundImage('/assets/test/img_1852.jpg', canvas.renderAll.bind(canvas));
      //  //http://localhost:1337/mediaServer/image/5oD?size=origin
      //    fabric.Image.fromURL('/assets/images/callout/callout_circle_right.svg',
      //      function(oImage){
      //        canvas.add(oImage);
      //      });
      //
      //    current = 'image';
      //}
      //else{
        current = 'color';
        var imgUrl ='http://localhost:1337/mediaServer/image/5oD?size=origin';
        //canvas.setBackgroundImage(imgUrl,canvas.renderAll.bind(canvas));
        canvas.setBackgroundImage(imgUrl,
          canvas.renderAll.bind(canvas), {
            backgroundImageStretch: false,
            width:canvas.width,
            height:canvas.height,
            crossOrigin: 'Anonymous'
          });


        //canvas.backgroundColor = 'rgba(0,155,255,0.3)';
      //}
    }

  });

