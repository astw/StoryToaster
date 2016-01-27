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

      fabric.Canvas.prototype.hideToolItems = function (toolboxSelector) {

        toolboxSelector = '.tool-items';
        $(toolboxSelector).css('left', "0px");
        $(toolboxSelector).css('top', "0px");
      }

      fabric.Canvas.prototype.setToolItems = function (object, toolboxSelector) {

        toolboxSelector = '.tool-items';
        var loc = this.getAbsoluteCoords(object);
        $(toolboxSelector).css('left', loc.left + "px");
        $(toolboxSelector).css('top', loc.top + "px");
      }

      fabric.Canvas.prototype.getAbsoluteCoords = function (object) {
        console.log('angle=', object.getAngle());
        return {
          left: object.left + this._offset.left,
          top: object.getTop() + this._offset.top + object.getHeight() * Math.sin((90 + object.getAngle()) * Math.PI / 180)
        };
      };

      fabric.Canvas.prototype.on('object:selected', function (obj) {
        if (obj.target) {

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
        this.setToolItems(this);
      });

      fabric.Image.prototype.on('scaling', function () {
        this.setToolItems(this);
      });

      fabric.Image.prototype.on('rotating', function () {
      });
    }
  }

})();

