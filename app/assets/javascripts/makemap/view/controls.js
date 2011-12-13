Ext.define("MM.view.Controls",{
  extend: "Ext.panel.Panel",
  alias: "widget.mapcontrols",
  layout: {
    type: 'vbox',
    align: 'stretch'
  },

  initComponent: function() {
    this.addEvents('changefoo');

    var aoiButton = {
      xtype: "button",
      itemId: "aoi",
      scale: 'medium',
      iconCls: 'geoShapeSquare',
      enableToggle: true,
      toggleGroup: 'maptools'
    };
    var selectButton = {
      xtype: "button",
      itemId: "select",
      scale: 'medium',
      iconCls: 'geoPan',
      enableToggle: true,
      pressed: true,
      toggleGroup: 'maptools'
    };
    var submitButton = {
      xtype: "button",
      itemId: "submit",
      scale: "large",
      text: "Make Map!",
      layout: "hbox",
      flex: 1,
      stretch: true,
      formBind: true
    }
    this.dockedItems = [{ 
      xtype: "toolbar",
      dock: "top",
      ui: 'footer',
      items: [selectButton,aoiButton]
    }];

    var bubble = Ext.create("MM.libs.bubble_event",{
      target: 'mapcontrols'
    });
    var form = Ext.create( "Ext.form.Panel", {
      fieldDefaults: {
        anchor: '100%'
      },
      bodyStyle: 'padding: 3px;',
      disabled: true,
      border: false,
      flex: 1,
      items: [{
        xtype: 'pixelsize',
        increment: 10,
        minValue: 1,
        maxValue: 4000,
        value: 50,
        width: 200,
        fieldLabel: "Pixel Size",
        name: 'pixelsize'
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
      '<p><b>Center:</b> {centerLat:number("0.0000")},{centerLon:number("0.0000")}</p>',
      '<p><b>Corners:</b></p>',
      '<tpl for="coords">',
        '<p>{x:number("0.0000")},{y:number("0.0000")}</p>',
      '</tpl>',
    '</tpl>',
    { compiled: true}
  ),

  updateInfo: function(data) {
    console.log("Updating info: ", data );
    this.info.update(this.data_tpl.apply(data));
  }

});