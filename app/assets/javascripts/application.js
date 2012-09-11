//= require jquery
//= require jquery_ujs
//= require bootstrap
//= require ./jq-openlayers
//= require ./gina-map-layers/gina-openlayers.js
//= require ./gina-map-layers/projections/all.js
//= require ./makemap
//= require_self



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

