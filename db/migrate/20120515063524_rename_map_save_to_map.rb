class RenameMapSaveToMap < ActiveRecord::Migration
  def change
		rename_table :map_saves, :maps
  end
end
