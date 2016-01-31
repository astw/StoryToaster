(function () {
  'use strict';

  angular
    .module('storyToaster')
    .factory('fabricJSExt', fabricJSExt);

  /* @ngInject */
  function fabricJSExt($rootScope) {
    return {
      init: init
    };

    ////////////////

    function init() {

      $('.tool-items').hide();
      objectOptions();

      fabric.Object.prototype.rotationPointBottom = true;
      fabric.Canvas.prototype.addImageObject = function(imageUrl){
        var self = this;
        fabric.Image.fromURL(imageUrl, function (img) {
          self.add(img);
          self.renderAll();
          $rootScope.$broadcast('pageChanged',{canvas:self});
          self.setActiveObject(img);
        }, {crossOrigin: 'Anonymous'})
      };

      fabric.Canvas.prototype.addBackgroundImage = function(imageUrl){
        imageUrl = imageUrl + "?size=origin";
        this.setBackgroundImage(imageUrl,
           this.renderAll.bind(this), {
            backgroundImageStretch: true,
            crossOrigin: 'Anonymous'
          });
        $rootScope.$broadcast('pageChanged',{canvas:this});
      };

       fabric.Canvas.prototype.hideToolItems = function (toolboxSelector) {
        toolboxSelector = '.tool-items';
        $(toolboxSelector).hide();
      };

      fabric.Canvas.prototype.setToolItems = function (object, toolboxSelector) {

        toolboxSelector = '.tool-items';
        var loc = this.getAbsoluteCoords(object);
        $(toolboxSelector).css('left', loc.left + "px");
        $(toolboxSelector).css('top', loc.top + "px");

        $(toolboxSelector).show();
      };

      fabric.Canvas.prototype.getAbsoluteCoords = function (object) {
        console.log('angle=', object.getAngle());
        var top= 0;
        var left =0;
        if(object instanceof  fabric.IText){
          top = 10;
          left = -20;
        }
        return {
          left: left + object.left + this._offset.left,
          //top: top + object.getTop() + this._offset.top + object.getHeight() //* Math.sin((90 + object.getAngle()) * Math.PI / 180)


          //top: top + object.getTop() + this._offset.top -40 //* Math.sin((90 + object.getAngle()) * Math.PI / 180)
          top: top + object.getTop() + this._offset.top  -40      // * Math.sin((90 + object.getAngle()) * Math.PI / 180)
        };
      };

      fabric.Canvas.prototype.on('object:selected', function (obj) {
        if (obj.target && this._offset.left > 0 && this._offset.top > 0) {
          console.log('object:selected');
          this.setToolItems(obj.target, this);
        }
      });

      fabric.Canvas.prototype.on('before:selection:cleared', function (obj) {
        if (obj.target) {

          console.log('before selection cleared ');
          this.hideToolItems();
        }
      });

      fabric.Canvas.prototype.on('onblur', function () {
        this.hideToolItems();
      });

      fabric.Image.prototype.on('selection:cleared', function () {
        console.log('cleared on image');
        this.canvas.hideToolItems();
      });

      fabric.Image.prototype.on('moving', function () {
        this.canvas.setToolItems(this, '.tool-items');
      });

      fabric.Image.prototype.on('scaling', function () {
        this.canvas.setToolItems(this, '.tool-items');
      });

      fabric.Image.prototype.on('rotating', function () {
      });

      fabric.Image.prototype.copy = function(){
        var object = fabric.util.object.clone(this);
        object.set("top", this.top + 20);
        object.set('left', this.left + this.getWidth());
        this.canvas.deactivateAll().renderAll();
        this.canvas.add(object);
        this.canvas.setActiveObject(object);
        this.canvas.setToolItems(object, '.tool-items');
      };

      fabric.Image.prototype.flipByX = function(){
        this.flipX = !this.flipX;
        this.canvas.renderAll();
      };

      fabric.Image.prototype.flipByY = function(){
        this.flipY = !this.flipY;
        this.canvas.renderAll();
      }

      //------------------------------------------------------ text

      //fabric.IText.prototype.on('moving', function () {
      //  this.canvas.setToolItems(this, '.tool-items');
      //  this.canvas.hideToolItems();
      //});

      //fabric.IText.prototype.on('selection:cleared', function () {
      //  console.log('cleared on image');
      //  this.hideToolItems();
      //});

      //------------------------------------------------------
      function objectOptions(){
        fabric.Canvas.prototype.hoverCursor = 'pointer';
        fabric.Object.prototype.selectionColor = 'red';
        fabric.Object.prototype.selectionBorderColor = 'red';
        fabric.Object.prototype.cornerColor = '#ff6619';
        fabric.Object.prototype.cornerSize = 8;
        fabric.Object.prototype.transparentCorners = false;
        fabric.Object.prototype.rotatingPointOffset = 30;

        fabric.IText.prototype.hasControls = true;
        fabric.IText.prototype.hasRotatingPoint = false;
        fabric.IText.prototype.hasBorders = true;
        fabric.IText.prototype.cornerSize = 6;
        fabric.IText.prototype.padding = 8;
        fabric.IText.prototype.textAlign = 'left';


        //fabric.IText.prototype.borderColor = "#ff6619";


        //ImageIText.prototype.hasControls = false;
      }
    }
  }

})();

