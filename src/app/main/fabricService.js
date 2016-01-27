(function () {
  'use strict';

  angular
    .module('storyToaster')
    .factory('fabricJSExt', fabricJSExt);

  /* @ngInject */
  function fabricJSExt( ) {
    var service = {
      init: init
    };
    return service;

    ////////////////

    function init() {

      $('.tool-items').hide();

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
        return {
          left: object.left + this._offset.left,
          top: object.getTop() + this._offset.top + object.getHeight() //* Math.sin((90 + object.getAngle()) * Math.PI / 180)
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
        this.hideToolItems();
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
    }
  }

})();

