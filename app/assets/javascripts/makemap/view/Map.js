Ext.define('MM.view.Map', {
  extend: 'Ext.OpenLayers.Basic',
  alias: "widget.map",
  bodyStyle: "background: black",
  autoScroll: true,



  initComponent: function() {
    this.addEvents("aoiadd");

    var projectionButton = {
      xtype: "button",
      text: "Projection",
      menu: [{
        text: "Alaskan Albers",
        projection: "EPSG:3338"
      },{
        text: "Technically we don't do this",
        projection: "EPSG:4326"
      },{
        text: "Polar",
        projection: "EPSG:3572"
      },{
        text: "Google",
        projection: "google"
      }]
    };
    this.dockedItems = [{
      xtype: "toolbar",
      dock: "top",
      items: projectionButton
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
      zoomWheelEnabled: true
    });

    mouseControl.enableZoomWheel();

    var mouseLocation = new OpenLayers.Control.MousePosition({
      displayProjection: this.getMap().displayProjection,
      numDigits: 4
    });

//    var layerPanel = new OpenLayers.Control.LayerSwitcher();
//    layerPanel.activate();

    this.getMap().addControls([mouseLocation,mouseControl,this.aoiTool]);
  },
  
  aoiAdd: function(e) {
    this.fireEvent("aoiadd", this, e.feature);
  },
  
  beforeFeatureAdded: function() {
    this.aoiLayer.removeAllFeatures();
  }

});