Ext.define("MM.view.Pixelsize",{
  extend: "Ext.slider.Single",
  alias: "widget.pixelsize",

  initComponent: function() {

    this.callParent();
  },

  tipText: function( slider ) {
    if( parseInt(slider.value) < 1000 ) {
        return slider.value + "M";
    } else {
        var v = parseFloat( slider.value) / 1000.0;
        return v + "KM";
    }
  }

});