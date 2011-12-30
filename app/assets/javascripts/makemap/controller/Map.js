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
        buildLayerMenu: this.buildLayerMenu
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

  buildLayerMenu: function() {
    var base = [], overlay = [];
    Ext.each(this.getMap().getMap().layers, function(item) {
      if(!item.displayInLayerSwitcher) { return; }

      if(item.isBaseLayer) {
        if(item.getVisibility()) { this.activeBaseLayer = item; }

        base.push({
          text: item.name,
          layer: item,
          group: this.id + '_baselayer',
          xtype: 'menucheckitem',
          checked: item.getVisibility(),
          scope: this,
          checkHandler: this.baseMenuHandler
        });
      } else {
        overlay.push({
          text: item.name,
          layer: item,
          xtype: 'menucheckitem',
          checked: item.getVisibility(),
          hideOnClick: false,
          scope: this,
          checkHandler: this.overlayMenuHandler
        });
      }
    }, this);
    this.getMap().layersMenu.removeAll();
    //this.getMap().layersMenu.add('<b>Base Layer</b>', base, '-', '<b>Overlays</b>', overlay);

    this.getMap().layersMenu.add(base);
  },

  baseMenuHandler: function( item ) {
    this.getMap().getMap().setBaseLayer( item.layer );
  },

  overlayMenuHandler: function( item ) {
    item.layer.setVisibility( !item.layer.getVisibility() );
  }

});