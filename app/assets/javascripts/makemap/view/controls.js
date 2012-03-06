Ext.define("MM.view.Controls",{
  extend: "Ext.panel.Panel",
  alias: "widget.mapcontrols",

  initComponent: function() {

    var submitButton = {
      xtype: "button",
      itemId: "makemaps",
      scale: "large",
      text: "Make Map!",
      flex: 1,
      stretch: true
    };

    var imageFormats = Ext.create( 'Ext.data.Store', {
      fields: ['imagetype','ext'],
      data: [
        { 'imagetype':'JPEG', 'ext':'jpg' },
        { 'imagetype':'GeoTIFF', 'ext':'tiff' }
       // { 'imagetype':'GeoTIFF w/ JPEG Compression', 'ext':'tiff_jpeg' }
      ]
    });
    var defaultFormat = imageFormats.last();
    this.layersStore = Ext.create( 'Ext.data.Store', {
      fields: ['text', 'layer'],
      storeId: 'Layers'
    });
    var form = Ext.create( "Ext.form.Panel", {
      fieldDefaults: {
        anchor: '100%'
      },
      bodyStyle: 'padding: 3px;',
      disabled: true,
      border: false,
      standardSubmit: false,
      items: [{
        xtype: 'combobox',
        fieldLabel: 'Layer',
        inputId: 'baselayer',
        name: 'image[baselayer]',
        store: this.layersStore,
        queryMode: 'local',
        displayField: 'text',
        valueField: 'layer'
      },{
        xtype: 'numberfield',
        minValue: 200,
        maxValue: 10000,
        fieldLabel: "Image Width",
        name: 'image[width]'
      },{
        xtype: 'numberfield',
        minValue: 200,
        maxValue: 10000,
        fieldLabel: "Image Height",
        name: 'image[height]'
      },{
        xtype: 'combobox',
        fieldLabel: 'Image Format',
        name: 'image[format]',
        store: imageFormats,
        queryMode: 'local',
        displayField: 'imagetype',
        valueField: 'ext',
        forceSelection: true,
        allowBlank: false,
        value: defaultFormat
      },{
        xtype: 'textfield',
        fieldLabel: "Image Name",
        name: 'image[name]',
        value: this.default_filename(),
        regex: /^\w+([\.\-]?\w+)*$/,
        regexText: "Not a valid name",
        allowBlank: false
      },{
        xtype: 'hiddenfield',
        name: 'ratio'
      }],
      dockedItems: [{
        xtype: "toolbar",
        dock: "bottom",
        ui: 'footer',
        formBind: false,
        height: 50,
        items: [submitButton]
      }]
    });

    this.info = Ext.create( "Ext.panel.Panel", {
      bodyStyle: 'padding: 3px;',
      border: false,
      flex: 1
    });

    this.items = [form,this.info];

    this.callParent(arguments);
  },

  data_tpl: new Ext.XTemplate(
    '<tpl for=".">',
      '<p><b>Area:</b> {area:number("0.0000")}</p>',
      '<p><b>Pixel Size: </b>{pixelsize:number("0")} meters</p>',
      '<p><b>Center:</b> {centerLat:number("0.0000")},{centerLon:number("0.0000")}</p>',
      '<p><b>Corners:</b></p>',
      '<tpl for="coords">',
        '<p>{x:number("0.0000")},{y:number("0.0000")}</p>',
      '</tpl>',
    '</tpl>',
    { compiled: true}
  ),

  updateInfo: function(data) {
    this.info.update(this.data_tpl.apply(data));
  },

  pad: function(n){return n<10 ? '0'+n : n},

  default_filename: function() {
    Today = new Date();

    return  "MM" + Today.getUTCFullYear() + this.pad(Today.getUTCMonth() + 1) + this.pad(Today.getUTCDay())
  }

});
