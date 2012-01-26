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
    var baselayer = this.getBaseLayer(map);
    console.log(baselayer[1]);
    Ext.apply(values,  {
      'image[wms]': baselayer[0],
      'image[baselayer]': baselayer[1],
      "image[bbox]":bbox[0].x+","+bbox[0].y+","+bbox[2].x+","+bbox[2].y
    });

/*    window.open("/makemap?"+Ext.Object.toQueryString(values)); */
    console.log(values);
   form.submit({
      method: "POST",
      url: "/makemap",
      params: values
    });
  },

  getBaseLayer: function(map) {
    var wms, wmsId;
    var index = Ext.each(map.layers, function(item) {
      if( !item.displayInLayerSwitcher) { return; }
      if( item.getVisibility() && item.isBaseLayer ) {
        return false;
      }
    }, this);
    console.log(index, map.layers[index]);
    wms = Gina.Layers.get( map.layers[index].options.wmsId, true);
    return [wms.url, wms.wmsOptions.layers];
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
