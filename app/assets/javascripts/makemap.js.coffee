# Place all the behaviors and hooks related to the matching controller here.
# All this logic will automatically be available in application.js.
# You can use CoffeeScript in this file: http://jashkenas.github.com/coffee-script/

class @MakeMap 
  constructor: (@form) ->
    
    @name = $(@form).find("#map-name");
    @width = $(@form).find("#map-width");
    @height = $(@form).find("#map-height");
    @size = $(@form).find("#map-size");
    @bbox = $(@form).find("#map-bbox");
    @wms = $(@form).find("#wms");
    @layers = $(@form).find("#map_layer_id")
    
    @ratio = 1;
    
    @initMap("#map-container");    
    $(@size).blur => 
      @setSize();
    $(@layers).change =>
      @redrawPreviewLayer();  
      

    $('#aoiTool').click (params) =>
      @aoiTool.activate();  
    $('#clearTool').click (params) =>
      @removeFeatures();
    $('#panTool').click (params) =>
      @aoiTool.deactivate(); 
    $("#makeMapBtn").click (params) =>
      @createMap(params);
    
  initMap: (el) ->
    @map = $(el).OpenLayers
      units: 'm'
      projection: "EPSG:3338",
      displayProjection: new OpenLayers.Projection("EPSG:4326")  
      eventListeners: 
        zoomend: =>
          @redrawPreviewLayer()  
      
    @aoiLayer = new OpenLayers.Layer.Vector "aoi", 
      displayInLayerSwitcher: false,
      eventListeners:
        beforefeatureadded: =>
          @removeFeatures()
      style:
        fill: false,
        strokeColor: "#ee9900"
      
    @map = @map[0]
    
    @aoiTool = new OpenLayers.Control.DrawFeature @aoiLayer, OpenLayers.Handler.RegularPolygon,
      eventListeners:
        featureadded: (feature) =>
          @aoiAdd(feature) 
      handlerOptions:
        irregular: true

        
    Gina.Layers.inject(@map, 'TILE.EPSG:3338.*');
     
    @map.zoomTo(3);        
    @map.addControls([@aoiTool]);    
      
      
  setHeight: (height = null) -> 
    if height == null
      height = $(@width).val() * @ratio
    
    @height.val(Math.round(height));
      
  setWidth: (width = null) ->
    if width == null
      width = $(@height).val() / @ratio
      
    $(@width).val(Math.round(width));
  
  setRatio: (r) ->
    @ratio = r
    
  # Set the width/height of the image based on the given bounding box
  #  Try to make the long edge as close to the value of side as possible,
  #  keeping the aspect ratio
  setSize: ->
    size = parseInt($(@size).val());
    boundry = @aoiLayer.features[0].geometry.getBounds();
    size = 1000 unless size;
    
    if boundry
      gWidth = boundry.getWidth();
      gHeight = boundry.getHeight();
      
      if(gWidth > gHeight)
        width = size
        height = (gHeight / gWidth) * size
      else
        height = size
        width = (gWidth / gHeight) * size
    else
      width = size;
      height = size;
      gWidth = size;
      gHeight = size;
    
    @setWidth width
    @setHeight height
    @setRatio (gWidth / gHeight)
    
  aoiAdd: (feature) ->
    geom = feature.feature.geometry.clone();    #map = feature.object.map;
    geom.transform( @map.getProjectionObject(),  @map.displayProjection);
    @map.addLayer(feature.feature.layer);
    @map.zoomToExtent(feature.feature.geometry.getBounds());
    @setSize();
    @aoiTool.deactivate();
    $(@bbox).val(feature.feature.geometry.toString());

    #Now we need to make a wms request
    @getPreviewLayer();
  
    return true
    
    
  removeFeatures: ->
    if @aoiLayer
      @aoiLayer.removeAllFeatures();
    if @previewLayer and @map.getLayersByName("preview").length > 0
      @map.removeLayer(@previewLayer)
      
  redrawPreviewLayer: ->
    if @previewLayer and @map.getLayersByName("preview").length > 0
      @map.removeLayer(@previewLayer);
      @getPreviewLayer();

  getPreviewLayer: ->
    if(@aoiLayer.features.length > 0)
      #Now we need to make a wms request
      bounds = @aoiLayer.features[0].geometry.getBounds();
      ul = new OpenLayers.LonLat(bounds.left, bounds.top);
      lr = new OpenLayers.LonLat(bounds.right, bounds.bottom);
      width = @map.getPixelFromLonLat(lr).x - @map.getPixelFromLonLat(ul).x;
      height = @map.getPixelFromLonLat(lr).y - @map.getPixelFromLonLat(ul).y;
      #Clone the form, set the width and height based on the selected area size, and get a preview image
      
      form = $(@form).clone();   
      $(form).find("#map-width").val(width);
      $(form).find("#map-height").val(height);
      #This is a workaround because jquery doesn't clone the selected option
      # Ticket #1294
      $(form).find("#map_layer_id").val($(@form).find("#map_layer_id").prop("selectedIndex"));
      
      $.get "/maps/preview", $(form).serialize(), (data) =>
        @previewLayer = new OpenLayers.Layer.Image "preview", data.cachedImage, bounds, new OpenLayers.Size(width, height), 
          visibility: true
        
        @map.addLayer(@previewLayer); 
        #Hack to make this work.  Not sure why visibility is getting disabled when the layer is added.
        @previewLayer.visibility = true
        @previewLayer.redraw();  
        
  createMap: (e) ->
    e.preventDefault();
    $("#infoBox").modal
      backdrop: 'static'
    
    $(@name).val($(@name).attr('placeholder')) unless $(@name).val();
    
    $.ajax $(@form).attr('action'),
      type: 'post',
      data: $(@form).serialize(),
      dataType: 'json',
      success: (data) =>
        $("#infoBox").modal("hide");
      error: (jqXhr, status, error) ->
        $("#infoBox modal-body").html error
      complete: (jqXhr, status) ->
        $("#infoBox").modal("hide");

    return true
  updateSavedMaps: (id) ->
    $.get "/maps/" + id, (data) =>
      $("#savedMaps").prepend(data);

    return true;    

      