class AddLayersToMapSave < ActiveRecord::Migration
  def change
    add_column :map_saves, :foo, :integer
  end
end
