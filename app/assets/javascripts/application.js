//= require jquery
//= require jquery_ujs
//= require_self
//= require ./gina-map-layers/debug/gina-openlayers.js
//= require bootstrap
//= require ./jq-openlayers
//= require ./makemap

var makemap;

$(document).ready(function() { 
  makemap = new MakeMap('#new_map');
  
  $("#options").click(function() {
    $("#map-form").modal('toggle');
  });  
  $(".modal-close").click(function() {
    $(this).parents(".modal").modal('hide');
  })
});

