class AddProjectionToMap < ActiveRecord::Migration
  def change
    add_column :maps, :projection, :string, default: "EPSG:4326"

  end
end
