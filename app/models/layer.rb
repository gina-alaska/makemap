class Layer < ActiveRecord::Base
  belongs_to :wms
  #has_and_belongs_to_many :maps
  has_many :maps
end
