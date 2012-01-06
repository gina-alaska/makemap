Ext.define('MM.controller.Makemap', {
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

      "mapcontrols > form button[itemId='makemap']": {
        click: this.buildMapQuery
      }
      
   })
  },

  buildMapQuery: function(btn, e) {
    var form = btn.up('form').getForm();
    var map = this.getMap().getMap();
    var aoi = map.getLayersByName("aoi")[0].features[0];
    var geom = aoi.geometry.clone();
    var bbox = geom.getVertices();
    var layers = this.getActiveLayers(map);
    var values = form.getValues();

    Ext.apply(values,  {
      'baseLayer[]': this.getBaseLayer(map),
      bbox: bbox[0].x+","+bbox[0].y+","+bbox[2].x+","+bbox[2].y
    });

    window.open("/makemap?"+Ext.Object.toQueryString(values));

  },

  getBaseLayer: function(map) {
    var layer;
    var wms;
    Ext.each(map.layers, function(item) {
      if( !item.displayInLayerSwitcher) { return; }
      if( item.getVisibility() && item.isBaseLayer ) {
        wms = [item.options.wmsUrl, item.options.wmsName];
      }
    });
    return wms;
  },

  getActiveLayers: function(map) {
    var layers = [];

    Ext.each(map.layers, function(item) {
      if( !item.displayInLayerSwitcher) { return; }

      if( item.getVisibility() && !item.isBaseLayer ) {
        layers.push( item.name )
      }
    }, this);
    return layers;
  }

});