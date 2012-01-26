class MapSave < ActiveRecord::Base
  validates :imagewidth, :numericality => { :only_integer => true,
            :greater_than => 0, :less_than_or_equal_to => 10000 }
  validates :imageheight, :numericality => { :only_integer => true,
            :greater_than => 0, :less_than_or_equal_to => 10000 }
  validates :name, :zoomlevel, :bbox, :presence => true
  validates :imageformat, :inclusion => { :in => %w( jpg tiff tiff_jpeg  ) }


end
