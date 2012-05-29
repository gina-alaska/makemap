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
});

