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
  
  paginates_per 16
    
  def to_wms_query_string opts = {}
    type = opts[:type] || "image/tiff"
    ext = opts[:ext] || "tif"
    logger.info(self.inspect)
    logger.info(self.name)
    logger.info("****************")
    query = [WMS_BASE,
      "LAYERS=#{layer.name}",
      "FORMAT=#{type}",
      "BBOX=#{wms_bounding_box}",
      "SRS=#{self.projection}",
      "WIDTH=#{self.width}",
      "HEIGHT=#{self.height}",
      "reaspect=false"].join('&')
    
      "#{self.layer.wms.hostname}/#{self.name}#{ext}?#{query}"
  end
  
  def wms_bounding_box
    bounds = GeoRuby::SimpleFeatures::Geometry.from_ewkt(bbox).envelope
    [ bounds.lower_corner.x,
      bounds.lower_corner.y,
      bounds.upper_corner.x,
      bounds.upper_corner.y ].join ","
  end
  
end