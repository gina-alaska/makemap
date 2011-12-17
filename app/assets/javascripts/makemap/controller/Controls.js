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
      "mapcontrols > form > pixelsize": {
        dragend: {
          fn: this.updateFields,
          buffer: 200
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

    var gSize, width, height, pixelsize;  

    var values = {};

    console.log("Last Value: ", field.lastValue );

    switch( field.name ) {
      case 'pixelsize':
        Ext.apply( values, {
          imagewidth: Math.ceil( this.calcImageLength( gWidth, field.getValue() )),
          imageheight: Math.ceil( this.calcImageLength( gHeight, field.getValue() ))
        });
        break;
      case 'imagewidth':
        pixelsize = this.calcPixelSize( gWidth, field.value);
        imageheight = this.calcImageLength( gHeight, pixelsize );
        imageheight = Math.round(field.value / fields.ratio);
        //imageheight = (field.value * gHeight) / gWidth;
        //ratio = parseInt(fields.imageheight) / parseInt(field.lastValue);
        Ext.apply( values, {
          imageheight: imageheight,//field.value * ratio,
          pixelsize: pixelsize
        });
        break;
      case 'imageheight':
        pixelsize = this.calcPixelSize( gHeight, field.value);
        //var ratio = parseInt(fields.imagewidth) / parseInt(field.lastValue) ;
        imagewidth = this.calcImageLength( gWidth, pixelsize );
        imagewidth = Math.round(field.value * fields.ratio);
        //imagewidth = (field.value * gWidth) / gHeight;
        Ext.apply( values, {
          imagewidth: imagewidth,
          pixelsize: pixelsize
        });
        break;
    }


    panel.getForm().setValues( values );

    this.updateInfo( geom );
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

    var pixelsize = panel.getForm().getValues().pixelsize;
    var width = this.calcImageLength( geom.getBounds().getWidth(), pixelsize );
    var height = this.calcImageLength( geom.getBounds().getHeight(), pixelsize );
    var ratio = width / height;
    panel.getForm().setValues({
      imagewidth: Math.round(width),
      imageheight: Math.round(height),
      ratio: ratio
    });
    this.updateInfo(geom);
  },

  updateInfo: function( geometry ) {
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
      coords: geom.getVertices()
    };

    var panel = Ext.ComponentQuery.query("mapcontrols")[0];
    panel.updateInfo(data);
  }
});

