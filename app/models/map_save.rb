class MapSave < ActiveRecord::Base
  mount_uploader :mapimage, MapimageUploader

  validates :width, :numericality => { :only_integer => true,
            :greater_than => 0, :less_than_or_equal_to => 10000 }
  validates :height, :numericality => { :only_integer => true,
            :greater_than => 0, :less_than_or_equal_to => 10000 }
  validates :name, :baselayer, :wms, :presence => true
  validates :format, :inclusion => { :in => %w( jpg tiff tiff_jpeg  ) }
end
