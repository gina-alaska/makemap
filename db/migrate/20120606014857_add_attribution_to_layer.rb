class AddAttributionToLayer < ActiveRecord::Migration
  def change
    add_column :layers, :attribution, :string, :default => "imagery (c) respective holders"

  end
end
