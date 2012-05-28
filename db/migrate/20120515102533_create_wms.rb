class CreateWms < ActiveRecord::Migration
  def change
    create_table :wms do |t|
      t.string :hostname
      t.string :shortname

      t.timestamps
    end
  end
end
