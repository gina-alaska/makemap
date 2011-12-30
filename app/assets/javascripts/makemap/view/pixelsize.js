Ext.define("MM.view.Pixelsize",{
  extend: "Ext.form.FieldContainer",
  alias: "widget.pixelsize",

  initComponent: function() {
    var initialValue = 50;  //50 meter pixels
    var minPS = 1;          //1 meter pixels
    var maxPS = 4000;       //4km pixels
    this.items = [{
      xtype: "sliderfield",
      tipText:  this.tipText,
      increment: 10,
      minValue: minPS,
      maxValue: maxPS,
      value: initialValue,
      flex: 1,
      name: 'pixelslider',
      listeners: {
        changecomplete: this.handleChange
      }
    },{
      xtype: "numberfield",
      width: 75,
      value: initialValue,
      minValue: minPS,
      maxValue: maxPS,
      name: 'pixelvalue',
      listeners: {
        change: {
          fn: this.handleChange,
          buffer: 500
        }
      }
    }];
    this.callParent();

    this.on('change', this.handleChange, this);
  },

  tipText: function( slider ) {
    if( parseInt(slider.value) < 1000 ) {
        return slider.value + "M";
    } else {
        var v = parseFloat( slider.value) / 1000.0;
        return v + "KM";
    }
  },

  handleChange: function(field, value) {
    field.up("form").getForm().setValues({
      pixelslider: value,
      pixelvalue: value
    });
  }

});