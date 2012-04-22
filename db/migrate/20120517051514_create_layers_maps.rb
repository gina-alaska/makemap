class CreateLayersMaps < ActiveRecord::Migration
  def up
    create_table :layers_maps, :id => false do |t|
      t.references :layer, :map
    end
    add_index :layers_maps, [:layer_id, :map_id]
  end

  def down
    drop_table :layers_maps
  end
end
