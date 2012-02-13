Ext.define('MM.controller.Makemap', {
  extend: 'Ext.app.Controller',
  refs: [{
    ref: 'map',
    selector: 'map'
  },{
    ref: 'controls',
    selector: 'mapcontrols'
  },{
    ref: 'maplist',
    selector: 'savedlist'
  }],

  init: function() {
    this.control( {

      "mapcontrols button[itemId='makemaps']": {
        click: this.buildMapQuery
      }
      
   })
  },

  buildMapQuery: function(btn, e) {
    var form = btn.up('form').getForm();
    var map = this.getMap().getMap();
    var aoi = map.getLayersByName("aoi")[0].features[0];
    var geom = aoi.geometry.clone();
    var layers = this.getActiveLayers(map);
    var values = form.getValues();
    var baselayer = this.getBaseLayer(map);

    Ext.apply(values,  {
      'image[wms]': baselayer[0],
      'image[bbox]': geom.toString()
    });
    
    form.submit({
      method: "POST",
      url: "/makemaps",
      params: values,
      waitMsg: "Please wait while your map is generated",
      success: this.updateStore,
      scope: this
    });


    return false;
  },

  getBaseLayer: function(map) {
    var wms, wmsId;
    var index = Ext.each(map.layers, function(item) {
      if( !item.displayInLayerSwitcher) { return; }
      if( item.getVisibility() && item.isBaseLayer ) {
        return false;
      }
    }, this);
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
  },

  updateStore: function(form, action) {
    var store = Ext.data.StoreMgr.lookup("SavedMaps");
    var result = action.result;
    var item = store.add(result.success)[0];
    store.sort();
    Ext.fly(this.getMaplist().getNode(item)).highlight("edb329",{ duration: 2000 });
  }

});
