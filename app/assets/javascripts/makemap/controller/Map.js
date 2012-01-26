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


      "map": {
        aoiadd: function( map, feature ) {
          var geom = feature.geometry.clone();
          Ext.ComponentQuery.query("map > toolbar > button[itemId='select']")[0].toggle(true);

          geom.transform( map.getMap().getProjectionObject(),  map.getMap().displayProjection);
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
    
    Ext.each(this.getMap().getMap().layers, function(item) {
      if(!item.displayInLayerSwitcher) { return; }

      if(item.isBaseLayer) {
        if(item.getVisibility()) { this.activeBaseLayer = item; }

        data.baseLayers.push({
          text: item.name,
          layer: item
        });
      } else {
        data.overlays.push({
          text: item.name,
          layer: item
        });
      }
    }, this);
    
    this.getControls().layersStore.removeAll();
    this.getControls().layersStore.add(data.baseLayers);
    this.getControls().down('form').getForm().setValues({
      'image[baselayer]': this.activeBaseLayer
    });
  },

  baseMenuHandler: function( item ) {
    this.getMap().getMap().setBaseLayer( item.layer );
  },

  overlayMenuHandler: function( item ) {
    item.layer.setVisibility( !item.layer.getVisibility() );
  }

});