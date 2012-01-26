class RenameFieldWmsurlToWmsInMapSave < ActiveRecord::Migration
  def change
    rename_column :map_saves, :wmsurl, :wms
  end

end
