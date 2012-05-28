class CreateLayers < ActiveRecord::Migration
  def change
    create_table :layers do |t|
      t.integer :wms_id
      t.string :name

      t.timestamps
    end
  end
end
