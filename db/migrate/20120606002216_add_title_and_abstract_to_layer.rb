class AddTitleAndAbstractToLayer < ActiveRecord::Migration
  def change
    add_column :layers, :title, :string

    add_column :layers, :abstract, :string

  end
end
