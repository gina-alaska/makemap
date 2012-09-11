#Based on Extjs-OpenLayers by William Fisher  - @teknofire on Github

$ = jQuery

$.fn.extend
  OpenLayers: (options) ->
    config = 
      map: null,
      layers: null,
      projection: 'EPSG:3338'
    
    mapConfig =  {}
    
    siteConfigs =
      # Alaska centric polar projection
      'Alaska - EPSG:3572': 
        defaultLayers: ['TILE.EPSG:3572.*'],
        minZoomLevel: 2,
        defaultBounds: new OpenLayers.Bounds(-2106121.205656,-4037734.1903821,2003133.434954,-1806995.9569081),
        maxExtent: new OpenLayers.Bounds(-12742200.0, -7295308.34278405, 7295308.34278405, 12742200.0),
        maxResolution: (20037508.34278405 / 256.0),
        units: 'm',
        projection: "EPSG:3572",
        displayProjection: new OpenLayers.Projection("EPSG:4326")
      # Alaskan Albers Equal Area
      'Alaska - EPSG:3338': 
        defaultLayers: ['TILE.EPSG:3338.*'],
        defaultBounds: new OpenLayers.Bounds(-2802734.375,-176025.390625,2939453.125,2941162.109375),
        maxExtent: new OpenLayers.Bounds(-3500000, -3500000, 3500000, 3500000),
        maxResolution: (3500000 * 2.0 / 256.0),
        minZoomLevel: 2,
        units: 'm',
        projection: "EPSG:3338",
        displayProjection: new OpenLayers.Projection("EPSG:4326")
      # Web Mercator
      'USA - EPSG:3857': 
        defaultLayers: ['TILE.EPSG:3857.*'],
        projection: "EPSG:3857",
        defaultBounds: new OpenLayers.Bounds(-15130862.621001,2553608.2405956,-6912353.3409229,7015084.7069238);
        units: 'm',
        maxResolution: 156543.0339,
        maxExtent: new OpenLayers.Bounds(-20037508, -20037508, 20037508, 20037508),
        displayProjection: new OpenLayers.Projection("EPSG:4326")

    setupMap = (options)->
      for el in this
        unless $.data(el, "map") 
          $.extend config, options
          mapConfig = $.extend {}, siteConfigs[config.site], config
          mapConfig.defaultLayers = config.layers if config.layers 
      
          map = new OpenLayers.Map(el, mapConfig);
          
          Gina.Layers.inject map, mapConfig.defaultLayers
          
          bounds = mapConfig.defaultBounds
          # bounds.transform map.displayProjection, map.getProjectionObject();
          map.zoomToExtent bounds
          
          map.addControl(new OpenLayers.Control.Attribution);
          
          #TODO: Handle map resizes automatically
                    
          $.data(el, "map", map)
    #setupLayers = (map) ->
      #Gina.Layers.inject map, mapConfig.defaultLayers
    
    methods =
      getmap: ->
        for el in this
          $.data(el, "map")
      
    method = Array.prototype.slice.call(arguments, 0)[0];
    if ( methods[method] )
      return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
    else if ( typeof method is 'object' or ! method )
      return setupMap.apply( this, arguments );
    else
      $.error( 'Method ' +  method + ' does not exist on jQuery.OpenLayers' );
             