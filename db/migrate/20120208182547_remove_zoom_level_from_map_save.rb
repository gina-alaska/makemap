class RemoveZoomLevelFromMapSave < ActiveRecord::Migration
  def up
    remove_column :map_saves, :zoomlevel
  end

  def down
    add_column :map_saves, :zoomlevel, :integer
  end
end
