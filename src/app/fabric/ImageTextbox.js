(function(global) {

  "use strict";

  fabric.ImageTextbox = fabric.util.createClass(fabric.IText, {

//var ImageTextbox = fabric.util.createClass(fabric.Textbox, {
///http://stackoverflow.com/questions/10009080/interactive-text-fields-with-fabric-js

    type: 'imageTextbox',
    src: '',

    flipH:false,
    flipV:false,

    initialize: function (text, options) {
      options || (options = {});

      this.left = 20;
      this.top = 20;

      this.callSuper('initialize', text);
      this.fontSize = options.fontSize;

      this.image = new Image();
      this.image.crossOrigin = "Anonymous";
      this.image.src = options.src;

      this.image.onload = (function () {
        this.loaded = true;
        this.setCoords();
        this.fire('image:loaded');
        if(this.canvas)
          this.canvas.renderAll();
      }).bind(this);
    },

    toObject: function () {
      return fabric.util.object.extend(this.callSuper('toObject'), {
        label: this.get('label'),
        src: this.image.src
      });
    },

    _render: function (ctx) {
      console.log('rendering imageTextBox', this.left);
      if (this.loaded) {
        //   ctx.drawImage(this.image, -this.width / 2 - 20, -this.height / 2 - 10, this.width + 40, this.height + 40);

        //this.flipH = true;
        //this.flipV = true;
        var scaleX = this.flipH ? -1 : 1, // Set horizontal scale to -1 if flip horizontal
          scaleY = this.flipV ? -1 : 1, // Set verical scale to -1 if flip vertical
          posX = this.flipH ? this.width * -1 : 0, // Set x position to -100% if flip horizontal
          posY = this.flipV ? this.height * -1 : 0; // Set y position to -100% if flip vertical

        if (this.flipH) {
          posX = this.flipH ? this.width / 2 * -1 : 0, // Set x position to -100% if flip horizontal
            posY = this.flipV ? this.height / 2 * -1 : 0; // Set y position to -100% if flip vertical
        }

        if(this.flipV){
          posY += this.height/2 + 10;
        }

        ctx.save(); // Save the current state
        ctx.scale(scaleX, scaleY); // Set scale to flip the image
        if (this.flipH) {
          ctx.drawImage(this.image, posX - 20, posY - this.height / 2 - 10, this.width + 40, this.height + 40); // draw the image
        }
        else {
          ctx.drawImage(this.image, posX - this.width / 2 - 20, posY - this.height / 2 - 10, this.width + 40, this.height + 40); // draw the image
        }

        //ctx.drawImage(img, posX -20, posY - 10, this.width + 40, this.height + 40); // draw the image
        ctx.restore(); // Restore the last saved state
        //ctx.drawImage(this.image, -this.width / 2 - 20, -this.height / 2 - 10, this.width + 40, this.height + 40);
      }

      this.callSuper('_render', ctx);
    }
  });

  fabric.ImageTextbox.fromObject = function (object) {
    var instance = new fabric.ImageTextbox(object.text, fabric.util.object.clone(object), function () {
      return instance && instance.canvas && instance.canvas.renderAll();
    });
    return instance;
  };

})( typeof exports != 'undefined' ? exports : this);
