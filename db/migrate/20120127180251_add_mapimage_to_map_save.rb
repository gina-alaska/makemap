class AddMapimageToMapSave < ActiveRecord::Migration
  def change
    add_column :map_saves, :mapimage, :string
  end
end
