Ext.define('MM.controller.Map', {
  extend: 'Ext.app.Controller',
  refs: [{
    ref: 'map',
    selector: 'map'
  },{
    ref: 'controls',
    selector: 'mapcontrols'
  }],

  init: function() {
    this.control( {
      "viewport > panel[itemId='content']": {
        render: function(panel) {
          this.addMap(panel, "EPSG:3338");
        }
      },
      "map > toolbar > button[text='Projection'] menuitem": {
        click: this.changeProjection
      },
      "map > toolbar > button[itemId='aoi']": {
        toggle: this.aoiAdd
      },

      "savedlist": {
        itemclick: this.changeAoi
      },

      "map": {
        aoiadd: function( map, feature ) {
          var geom = feature.geometry.clone();
          Ext.ComponentQuery.query("map > toolbar > button[itemId='select']")[0].toggle(true);

          geom.transform( map.getMap().getProjectionObject(),  map.getMap().displayProjection);
          this.zoomToAOI( feature );
        },
        buildLayerComboBox: this.buildLayerComboBox
      }
    })
  },

  aoiAdd: function(btn, active) {
    if( active ) {
      this.getMap().aoiTool.activate();
    }else {
      this.getMap().aoiTool.deactivate();
    }
  },
  
  addMap: function( panel, projection ) {
    this.activeMap = panel.add( Ext.create("MM.view.Map",{
        projection: projection
    }));
  },

  changeProjection: function( button ) {
    var panel = this.activeMap.up("panel");
    panel.remove( this.activeMap );
    this.activeMap.destroy();
    this.addMap( panel, button.projection );
  },

  buildLayerComboBox: function() {
    var data = { baseLayers: [], overlays: [] };
    var map = this.getMap();

    this.getControls().layersStore.removeAll();

    Ext.each(this.getMap().getMap().layers, function(item) {
      if(!item.displayInLayerSwitcher) { return; }
      if(!item.options.wmsId) {return;}
      wms = Gina.Layers.get( item.options.wmsId, true);

      if(item.isBaseLayer) {
        this.getControls().layersStore.add({
          text: wms.name,
          layer: wms.wmsOptions.layers
        });
        if(item.getVisibility()) {
          this.activeBaseLayer = wms.name;
          this.getControls().down('form').getForm().setValues({
            'image[baselayer]': wms.wmsOptions.layers
          });
        }
      } 
    }, this);
  },

  baseMenuHandler: function( item ) {
    this.getMap().getMap().setBaseLayer( item.layer );
  },

  overlayMenuHandler: function( item ) {
    item.layer.setVisibility( !item.layer.getVisibility() );
  },

  changeAoi: function( scope, record ) {
    //Create a new aoi and draw it on the map
    var geom = new OpenLayers.Geometry.fromWKT( record.data.bbox );
    var aoiFeature = new OpenLayers.Feature.Vector(geom);

    this.getMap().aoiLayer.addFeatures( [aoiFeature] );
    this.zoomToAOI( aoiFeature );
  },

  zoomToAOI: function( feature ) {
    this.getMap().getMap().zoomToExtent( feature.geometry.getBounds() )
  }

});