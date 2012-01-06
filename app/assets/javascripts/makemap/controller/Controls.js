Ext.define('MM.controller.Controls', {
  extend: 'Ext.app.Controller',

  refs: [{
    ref: 'map',
    selector: 'map'
  }],

  init: function() {
    this.control( {

      "map": {
        aoiadd: this.updateWizard
      },

      "mapcontrols > form > field": {
        blur: this.updateFields
      },
      "mapcontrols > form > field[name='baselayer']": {
        change: {
          fn: this.changeBaseLayer,
          buffer: 500
        }
      },
      "mapcontrols > form numberfield": {
        change: {
          fn: this.updateFields,
          buffer: 500
        }
      }
   })
  },

  updateFields: function( field, newValue, oldValue ) {
    var panel = Ext.ComponentQuery.query("mapcontrols form")[0];
    var fields = panel.getForm().getFieldValues();
    
    var geom = this.getMap().aoiLayer.features[0].geometry;
    var gWidth = geom.getBounds().getWidth();
    var gHeight = geom.getBounds().getHeight();

    var gSize, width, height;

    var values = {};

    switch( field.name ) {
      case 'imagewidth':
        var imageheight = Math.round(field.value / fields.ratio);
        Ext.apply( values, {
          imageheight: imageheight
        });
        break;
      case 'imageheight':
        var imagewidth = Math.round(field.value * fields.ratio);
        Ext.apply( values, {
          imagewidth: imagewidth
        });
        break;
    }

    panel.getForm().setValues( values );
    //Make sure we're using the update form values
    var pixelsize = this.calcPixelSize(gWidth, panel.getForm().getValues().imagewidth);

    this.updateInfo( geom, pixelsize );
  },

  changeBaseLayer: function( field, newValue, oldValue) {
    var layer = field.getValue();
    if( this.getMap().getMap().getLayersByName( layer )) {
      this.getMap().getMap().setBaseLayer( layer );
    }
  },

  calcPixelSize: function( gSize, iSize) {
    return gSize / iSize
  },

  calcImageLength: function( geomLength, pixelsize) {
    return geomLength / pixelsize;
  },

  updateWizard: function( map, feature ) {
    var panel = Ext.ComponentQuery.query("mapcontrols form")[0];
    panel.enable();
    
    var geom = feature.geometry.clone();

    var gWidth = geom.getBounds().getWidth();
    var gHeight = geom.getBounds().getHeight();
    var ratio = gWidth / gHeight;
    var width, height, pixelsize;

    if( gWidth < gHeight ) {
      width = 1000;
      pixelsize = this.calcPixelSize( gWidth, width);
      height = this.calcImageLength( gHeight, pixelsize );
    } else {
      height = 1000;
      pixelsize = this.calcPixelSize( gHeight, height);
      width = this.calcImageLength( gWidth, pixelsize);
    }

    panel.getForm().setValues({
      imagewidth: Math.round( width ),
      imageheight: Math.round( height ),
      ratio: ratio
    });
    this.updateInfo(geom, pixelsize);
  },

  updateInfo: function( geometry, pixelsize ) {
    var geom = geometry.clone();
    //Transforming to the map projection causes it to calculate area in degrees^2(?)
    var area = geom.getArea();
    if( area > (1000 * 1000) ) {
      area = area / (1000 * 1000);
    }
    
    geom.transform( this.getMap().getMap().getProjectionObject(),  this.getMap().getMap().displayProjection);

    var data = {
      centerLat: geom.getCentroid().x,
      centerLon: geom.getCentroid().y,
      area: area,
      pixelsize: pixelsize,
      coords: geom.getVertices()
    };

    var panel = Ext.ComponentQuery.query("mapcontrols")[0];
    panel.updateInfo(data);
  }
});

