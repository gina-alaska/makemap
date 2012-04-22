//= require jquery
//= require jquery_ujs
//= require_self
//= require ./gina-map-layers/gina-openlayers.js
//= require bootstrap

$(document).ready(function() { 
  var map = new OpenLayers.Map("map-container");
  var aoiLayer = new OpenLayers.Layer.Vector("aoi",{
    displayInLayerSwitcher: false,
    eventListeners: {
        beforefeatureadded: removeFeatures
    }
  });
  
  var aoiTool = new OpenLayers.Control.DrawFeature( aoiLayer, OpenLayers.Handler.RegularPolygon, {
     eventListeners: {
       featureadded: aoiAdd
     },
     handlerOptions: {
      irregular: true
     }
   });

  Gina.Layers.inject(map, 'TILE.EPSG:3338.*');
   
  map.zoomTo(3);        
  map.addControls([aoiTool]);
  $('.dropdown-menu a').click(function() {
    console.log($(this).text());
    $(this).parents('ul.dropdown-menu').siblings('a.dropdown-toggle').find('span').text( $(this).text() ); 
    console.log($(this).parents('ul'));   
  });
  
  $('.dropdown').click(function(event){
    event.preventDefault();
    input = $(this).find('a').attr('href');
    $(this).find('a').hide()
    console.log($(input));
    $(this).append($(input));
  });
  
  $('#map-toolbar').click(function(params) {
    console.log(params);
  });
  $('#aoiTool').click(function(params) {
    console.log(params);
    aoiTool.activate();
  });  
});

function aoiAdd(feature) {
  var geom = feature.feature.geometry.clone();
  
  var map = feature.object.map;
  
  geom.transform( map.getProjectionObject(),  map.displayProjection);
  map.addLayer(feature.feature.layer);
  map.zoomToExtent(geom.getBounds());
}

function removeFeatures(feature) {
  this.removeAllFeatures();  
}