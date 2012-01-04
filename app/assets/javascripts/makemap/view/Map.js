Ext.define('MM.view.Map', {
  extend: 'Ext.OpenLayers.Basic',
  alias: "widget.map",
  bodyStyle: "background: black",
  layers:  ['bdl_3338', 'osm_base_3338'],
  
  initComponent: function() {
    this.addEvents("aoiadd");

    this.layers= ['bdl_3338','topo_3338', 'osm_base_3338']//,'bathy_3338'];
//'charts', 'shaded_relief', 'landsat_pan',
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