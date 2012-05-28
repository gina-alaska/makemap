class RemoveColumnsFromMap < ActiveRecord::Migration
  def change
    remove_column :maps, :wms
    remove_column :maps, :baselayer
    remove_column :maps, :overlays
    remove_column :maps, :foo
    remove_column :maps, :format
  end
end
