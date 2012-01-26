class ChangeFieldNamesInMapSave < ActiveRecord::Migration
  change_table :map_saves do |t|
    t.rename :imageformat, :format
    t.rename :imagewidth, :width
    t.rename :imageheight, :height
    t.rename :bounds, :bbox
  end
end
