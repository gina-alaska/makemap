Ext.define("MM.view.Controls",{
  extend: "Ext.panel.Panel",
  alias: "widget.mapcontrols",
  layout: {
    type: 'vbox',
    align: 'stretch'
  },

  initComponent: function() {

    var submitButton = {
      xtype: "button",
      itemId: "makemap",
      scale: "large",
      text: "Make Map!",
      layout: "hbox",
      flex: 1,
      stretch: true,
      formBind: true
    };

    var imageFormats = Ext.create( 'Ext.data.Store', {
      fields: ['imagetype','ext'],
      data: [
        { 'imagetype':'JPEG', 'ext':'jpg' },
        { 'imagetype':'GeoTIFF', 'ext':'tiff' },
        { 'imagetype':'GeoTIFF w/ JPEG Compression', 'ext':'tiff_jpeg' }
      ]
    });
    var defaultFormat = imageFormats.first();
    this.layersStore = Ext.create( 'Ext.data.Store', {
      fields: ['text', 'layer']
    });
    
    var form = Ext.create( "Ext.form.Panel", {
      fieldDefaults: {
        anchor: '100%'
      },
      bodyStyle: 'padding: 3px;',
      disabled: true,
      border: false,
      standardSubmit: true,
      items: [{
        xtype: 'combobox',
        fieldLabel: 'Layer',
        name: 'baselayer',
        store: this.layersStore,
        queryMode: 'local',
        displayField: 'text',
        valueField: 'layer'
      },{
        xtype: 'numberfield',
        minValue: 200,
        maxValue: 10000,
        fieldLabel: "Image Width",
        name: 'imagewidth'
      },{
        xtype: 'numberfield',
        minValue: 200,
        maxValue: 10000,
        fieldLabel: "Image Height",
        name: 'imageheight'
      },{
        xtype: 'combobox',
        fieldLabel: 'Image Format',
        name: 'imageformat',
        store: imageFormats,
        queryMode: 'local',
        displayField: 'imagetype',
        valueField: 'ext',
        forceSelection: true,
        allowBlank: false,
        value: defaultFormat
      },{
        xtype: 'hiddenfield',
        name: 'ratio'
      }],
      dockedItems: [{
        xtype: "toolbar",
        dock: "bottom",
        ui: 'footer',
        formBind: true,
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
      '<p><b>Pixel Size: </b>{pixelsize:number("0.0000")} meters</p>',
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
  }

});