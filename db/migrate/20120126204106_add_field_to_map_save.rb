class AddFieldToMapSave < ActiveRecord::Migration
  def change
    add_column :map_saves, :wmsurl, :text
  end
end
