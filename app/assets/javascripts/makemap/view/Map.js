Ext.define('MM.view.Map', {
  extend: 'Ext.OpenLayers.Basic',
  alias: "widget.map",
  bodyStyle: "background: black",
  
  initComponent: function() {
    this.addEvents("aoiadd");

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

    this.layersMenu = Ext.create( 'Ext.menu.Menu' );
    var layersButton = {
      xtype: 'button',
      text: 'Layers',
      menu: this.layersMenu
    };

    this.dockedItems = [{
      xtype: "toolbar",
      dock: "top",
      items: [selectButton, aoiButton, layersButton ] //projectionButton
    }];

    this.callParent(arguments);
    this.on("ready", this.onMapReady, this);
  },

  onMapReady: function( ) {
    this.aoiLayer = new OpenLayers.Layer.Vector("aoi",{
      displayInLayerSwitcher: false,
      eventListeners: {
          beforefeatureadded: Ext.bind(this.beforeFeatureAdded, this)
      }
    });
    this.getMap().addLayer( this.aoiLayer );

    var controlPanel = new OpenLayers.Control.Panel();

    this.aoiTool = new OpenLayers.Control.DrawFeature( this.aoiLayer, OpenLayers.Handler.RegularPolygon, {
      eventListeners: {
        featureadded: Ext.bind( this.aoiAdd, this)
      },
      handlerOptions: {
       irregular: true
      }
    });

    var mouseControl = new OpenLayers.Control.Navigation({
      zoomWheelEnabled: true,
      mouseWheelOptions: {
        interval: 100
      }
    });

    var mouseLocation = new OpenLayers.Control.MousePosition({
      displayProjection: this.getMap().displayProjection,
      numDigits: 4
    });

    this.getMap().addControls([mouseLocation,mouseControl,this.aoiTool]);
    this.getMap().events.register('addlayer', this, this.buildLayerMenu);
    this.getMap().events.register('changebaselayer', this, this.buildLayerMenu);
    this.getMap().events.register('changelayer', this, this.buildLayerMenu);
    this.getMap().events.register('removelayer', this, this.buildLayerMenu);

    this.buildLayerMenu();
  },
  
  aoiAdd: function(e) {
    this.fireEvent("aoiadd", this, e.feature);
  },
  
  beforeFeatureAdded: function() {
    this.aoiLayer.removeAllFeatures();
  },

  buildLayerMenu: function() {
    this.fireEvent('buildLayerMenu', this);
  }

});