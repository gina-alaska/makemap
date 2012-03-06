Ext.define('MM.view.Map', {
  extend: 'Ext.OpenLayers.Basic',
  alias: "widget.map",
  bodyStyle: "background: black",

  initComponent: function() {
    this.addEvents("aoiadd");

    this.layers = [ 'TILE.EPSG:3338.BDL', 
                    'TILE.EPSG:3338.TOPO', 
                    'TILE.EPSG:3338.OSM_OVERLAY' ];
                    //'TILE.EPSG:3338.CHARTS', 'TILE.EPSG:3338.SHADED_RELIEF' ];
    
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

    this.dockedItems = [{
      xtype: "toolbar",
      dock: "top",
      items: [selectButton, aoiButton]
    }];

    this.callParent(arguments);
    this.on("ready", this.onMapReady, this);
  },

  onMapReady: function( ) {
    Ext.each(this.getMap().layers, function(item) {
      console.log(item);
      if( item.name != "OpenStreetMap") { return };
      item.setVisibility(true);
    }, this);
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

    this.buildLayerComboBox();
  },
  
  aoiAdd: function(e) {
    this.fireEvent("aoiadd", this, e.feature);
  },
  
  beforeFeatureAdded: function() {
    this.aoiLayer.removeAllFeatures();
  },

  buildLayerComboBox: function() {
    this.fireEvent('buildLayerComboBox', this);
  }

});