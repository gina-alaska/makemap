Ext.define('MM.controller.Map', {
  extend: 'Ext.app.Controller',

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

      "map": {
        aoiadd: function( map, feature ) {
          var geom = feature.geometry.clone();

          geom.transform( map.getMap().getProjectionObject(),  map.getMap().displayProjection);
        }
      }
    })
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
  }

});