class MakeMapWMS

  LAYERS = {
    :bdl => "BestDataAvailableLayer"
  }
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
    opts = opts.first
    @wms = opts[:wms] || "wms.alaskamapped.org"
    @baselayer_short = LAYERS.has_key?(opts[:baseLayer]) ? opts[:baseLayer] : "bdl"
    @layers = [LAYERS[@baselayer_short.to_sym], opts[:layers]].flatten.compact.join(',')
    @width = opts[:imagewidth] || 1024
    @height = opts[:imageheight] || 1024
    @bbox = opts[:bbox]
    @format = opts[:imageformat]
  end

  def to_s
    query = [WMS_BASE,
    "LAYERS=#{@layers}",
    "FORMAT=#{type}",
    "BBOX=#{@bbox}",
    "SRS=EPSG:3338",
    "WIDTH=#{@width}",
    "HEIGHT=#{@height}",
    "reaspect=false"]

    "http://#{@wms}/#{@baselayer_short.to_s}/makemap.#{ext}?#{query.join('&')}"
  end

  def type
    FORMATS[@format.to_sym][:mimetype]
  end

  def ext
    FORMATS[@format.to_sym][:ext]
  end
end