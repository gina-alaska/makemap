# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended to check this file into your version control system.

ActiveRecord::Schema.define(:version => 20120528071016) do

  create_table "layers", :force => true do |t|
    t.integer  "wms_id"
    t.string   "name"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  create_table "layers_maps", :id => false, :force => true do |t|
    t.integer "layer_id"
    t.integer "map_id"
  end

  add_index "layers_maps", ["layer_id", "map_id"], :name => "index_layers_maps_on_layer_id_and_map_id"

  create_table "maps", :force => true do |t|
    t.text     "name"
    t.integer  "width"
    t.integer  "height"
    t.text     "bbox"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
    t.string   "mapimage"
    t.integer  "layer_id"
  end

  create_table "wms", :force => true do |t|
    t.string   "hostname"
    t.string   "shortname"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

end