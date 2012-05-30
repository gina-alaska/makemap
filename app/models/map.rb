require 'geo_ruby'

class Map < ActiveRecord::Base
  WMS_BASE = "REQUEST=GetMap&SERVICE=WMS&STYLES=&VERSION=1.1.1&BGCOLOR=0xFFFFFF&TRANSPARENT=TRUE"
  
  #has_and_belongs_to_many :layers
  belongs_to :layer
  
  mount_uploader :mapimage, MapimageUploader

  validates :width, :numericality => { :only_integer => true,
            :greater_than => 0, :less_than_or_equal_to => 10000 }
  validates :height, :numericality => { :only_integer => true,
            :greater_than => 0, :less_than_or_equal_to => 10000 }
  validates :name, :presence => true
  
  # def as_json(opts = {})
  #   {
  #     :id => id,
  #     :name => name,
  #     :format => format,
  #     :bbox => bbox,
  #     :wms => wms,
  #     :baselayer => baselayer,
  #     :overlays => overlays,
  #     :url => self.to_s,
  #     :width => width,
  #     :height => height,
  #     :imageUrl => self.mapimage.url,
  #     :thumbUrl => self.mapimage.url(:thumb),
  #     :created_at => self.created_at,
  #     :filesize => self.mapimage.file.size / (1024*1024).to_f
  #   } 
  # end
  
  def to_wms_query_string opts = {}
    #TODO:  Allow user to pick projection
    type = opts[:type] || "image/tiff"
    ext = opts[:ext] || "tif"
    logger.info(self.inspect)
    logger.info(self.name)
    logger.info("****************")
    query = [WMS_BASE,
      "LAYERS=#{layer.name}",
      "FORMAT=#{type}",
      "BBOX=#{wms_bounding_box}",
      "SRS=EPSG:3338",
      "WIDTH=#{self.width}",
      "HEIGHT=#{self.height}",
      "reaspect=false"].join('&')
    
      "#{self.layer.wms.hostname}/#{self.name}.#{ext}?#{query}"
  end
  
  def wms_bounding_box
    bounds = GeoRuby::SimpleFeatures::Geometry.from_ewkt(bbox).envelope
    [ bounds.lower_corner.x,
      bounds.lower_corner.y,
      bounds.upper_corner.x,
      bounds.upper_corner.y ].join ","
  end
  
end