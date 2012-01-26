class AddFieldsToMapSave < ActiveRecord::Migration
  def change
    add_column :map_saves, :baselayer, :text
    add_column :map_saves, :overlays, :text
  end
end
