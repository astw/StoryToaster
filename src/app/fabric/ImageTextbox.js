var ImageTextbox = fabric.util.createClass(fabric.Textbox, {
///http://stackoverflow.com/questions/10009080/interactive-text-fields-with-fabric-js


  type: 'imageTextbox',
  src:'',

  initialize: function(text,options) {
    options || (options = { });

    this.left = 20;
    this.top = 20;

    this.callSuper('initialize', text);
    this.fontSize = options.fontSize;

    this.image = new Image();
    this.image.crossOrigin = "Anonymous";
    this.image.src = options.src;

    this.image.onload = (function(){
      this.loaded = true;
      this.setCoords();
      this.fire('image:loaded')
      this.canvas.renderAll();
    }).bind(this);
  },

  toObject: function() {
    return fabric.util.object.extend(this.callSuper('toObject'), {
      label: this.get('label')
    });
  },

  _render: function(ctx) {
    console.log('rendering imageTextBox', this.left);
    if(this.loaded)
    {
      ctx.drawImage(this.image, -this.width/2 - 20, -this.height /2  -10 , this.width + 40, this.height + 40 );
    }

    this.callSuper('_render', ctx);
  }
});

