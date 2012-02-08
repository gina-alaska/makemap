class CreateMapSaves < ActiveRecord::Migration
  def change
    create_table :map_saves do |t|
      t.text :name
      t.text :imageformat
      t.integer :imagewidth
      t.integer :imageheight
      t.text :bounds
      t.integer :zoomlevel

      t.timestamps
    end
  end
end
