//= require jquery
//= require jquery_ujs
//= require bootstrap
//= require ./jq-openlayers
//= require ./gina-map-layers/gina-openlayers.js
//= require ./gina-map-layers/projections/all.js
//= require ./makemap
//= require_self

Proj4js.defs["EPSG:3857"] = "+proj=merc +a=6378137 +b=6378137 +lat_ts=0.0 +lon_0=0.0 +x_0=0.0 +y_0=0 +k=1.0 +units=m +nadgrids=@null +wktext  +no_defs";

var makemap;

$(document).ready(function() { 
  makemap = new MakeMap('#new_map');
  
  $("#options").click(function() {
    $("#map-form").modal('toggle');
  });  
  $(".modal-close").click(function() {
    if($(this).hasClass("disabled")) {
      return false;
    }
    $(this).parents(".modal").modal('hide');
  })
});

