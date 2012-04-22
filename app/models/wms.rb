require 'open-uri'

class Wms < ActiveRecord::Base
  validates_uniqueness_of :hostname
  
  has_many :layers

  def queryAvailableLayers
    capabilities = getCapabilities
    capabilities.xpath("//layer//name").children.collect(&:to_s)
  end
  
  def getCapabilities
    Nokogiri::HTML(open("#{self.hostname}?GetCapabilities"))
  end
    
    
  def addLayersFromCapabilities
    layers = queryAvailableLayers
    layers.each do |layer|
      Layer.create( wms_id: self.id, name: layer )
    end
  end
end


