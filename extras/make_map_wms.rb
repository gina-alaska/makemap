require 'geo_ruby'

class MakeMapWMS
  FORMATS = {
    :jpg => {
      :ext => "jpg",
      :mimetype => "image/jpeg"
    },
    :tiff => {
      :ext => "tif",
      :mimetype => "image/tiff",
    },
    :tiff_jpeg => {
      :ext => "tif",
      :mimetype => "image/tiff_jpeg"
    }
  }
  WMS_BASE = "REQUEST=GetMap&SERVICE=WMS&STYLES=&VERSION=1.1.1&BGCOLOR=0xFFFFFF&TRANSPARENT=TRUE"
  def initialize *opts
    if opts.first.is_a? MapSave
      mapsaveconv( opts.first )
    else
      opts = opts.first
      @wms = opts[:wms] || "http://wms.alaskamapped.org/bdl"
      @layers = opts[:baselayer] || "BestDataAvailableLayer"
      #@layers = [opts[:baseLayer][:wmsName], opts[:layers]].flatten.compact.join(',')
      @width = opts[:width] || 1024
      @height = opts[:height] || 1024
      @bbox = opts[:bbox]
      @format = opts[:format]
      @name = opts[:name]
    end
  end

  def to_s
    query = [WMS_BASE,
    "LAYERS=#{@layers}",
    "FORMAT=#{type}",
    "BBOX=#{bbox}",
    "SRS=EPSG:3338",
    "WIDTH=#{@width}",
    "HEIGHT=#{@height}",
    "reaspect=false"]

    "#{@wms}/#{name}?#{query.join('&')}"
  end

  def name
    "#{@name}.#{ext}"
  end

  def type
    FORMATS[@format.to_sym][:mimetype]
  end

  def ext
    FORMATS[@format.to_sym][:ext]
  end

  def bbox
    bounds = GeoRuby::SimpleFeatures::Geometry.from_ewkt(@bbox).envelope
    [ bounds.lower_corner.x,
      bounds.lower_corner.y,
      bounds.upper_corner.x,
      bounds.upper_corner.y ].join ","
  end

  #Convert MapSave object to variables
  def mapsaveconv( map )
    @wms = map.wms || "http://wms.alaskamapped.org/bdl"
    @layers = map.baselayer || "BestDataAvailableLayer"
    #@layers = [opts[:baseLayer][:wmsName], opts[:layers]].flatten.compact.join(',')
    @width = map.width || 1024
    @height = map.height || 1024
    @bbox = map.bbox
    @format = map.format
    @name = map.name
  end

end
