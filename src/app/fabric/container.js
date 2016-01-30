fabric.Container = fabric.util.createClass(fabric.Textbox, {

  type: 'Container',
  initialize: function(options) {

    this.placedColor = 'rgba(211,211,211, 1)';
    this.virtualModeColor = 'rgba(211,211,211, 0.5)';

    this.setToVirtualMode();

    options || (options = { });
    this.callSuper('initialize', options);
    this.set({
      label : options.label || '',
      'top' : options.top || 0,
      'left':  options.left || 0,
      'height' : options.height || 50,
      'fill' : options.fill || this.backgroundColor
    });
    self = this;
  },

  /**
   *@description set render mode to virtual
   */
  setToVirtualMode : function () {
    this.isInVirtualMode = true;
    this.backgroundColor = this.virtualModeColor;
  },

  /**
   * @description set render mode to placement
   */
  setToPlacementMode : function(){
    this.isInVirtualMode = false;
    this.backgroundColor = this.placedColor;
  },

  /**
   * @description toggle virtual mode on and off
   */
  toggleVirtualMode : function(){

    if (this.isInVirtualMode){
      this.setToPlacementMode();
    }else{
      this.setToVirtualMode();
    }
    this.set('fill', this.backgroundColor);
  },

  _render: function(ctx) {
    this.callSuper('_render', ctx);
  }
});
