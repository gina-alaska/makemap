class AddLayerIdToMaps < ActiveRecord::Migration
  def change
    add_column :maps, :layer_id, :integer

  end
end
