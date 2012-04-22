# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

#wmss = []
#wmss << WMS.create(hostname: 'http://wms.alaskamapped.org/bdl', shortname: 'Best Data Available')
#wmss << WMS.create(hostname: 'http://wms.alaskamapped.org/extras', shortname: 'Extras')

# wmss.each do |wms|
#   wms.addLayersFromCapabilities
# end
Wms.destroy_all
Layer.destroy_all
#Add BDL WMS/Layers manually
wms = Wms.create(hostname: 'http://wms.alaskamapped.org/bdl', shortname: 'Best Data Available')
wms.layers << Layer.new(name: "BestDataAvailableLayer", 
                  title: "Best Data Layer", 
                  abstract: "A WMS-compliant map server provided by the Alaska Mapped program (http://www.alaskamapped.org) and UAF-GINA (http://www.gina.alaska.edu).")
               
#Add Extras WMS/Layers Manually
wms = Wms.create(hostname: 'http://wms.alaskamapped.org/extras', shortname: 'Extras')
wms.layers << Layer.new(name: "GINA Bathymetry", title: "GINA Bathymetry", abstract: "GINA Bathymetry")
wms.layers << Layer.new(name: "Landsat Pan", title: "Landsat Pan", abstract: "Landsat Pan")
wms.layers << Layer.new(name: "Blue_Marble", title: "Blue Marble", abstract: "Hand brightened version on the 2000 vintage NASA Blue Marble dataset.")
wms.layers << Layer.new(name: "Pseudo Color Landsat", title: "Pseudo Color Landsat", abstract: "Pseudo Color Landsat")
wms.layers << Layer.new(name: "Hill Shaded DRG", title: "Hill Shaded DRG", abstract: "Hill Shaded DRG")
wms.layers << Layer.new(name: "Shaded Relief NED", title: "Shaded Relief NED", abstract: "Shaded Relief NED")

#Add NOAA Charts WMS/Layers Manually
wms = Wms.create(hostname: 'http://wms.alaskamapped.org/charts', shortname: 'NOAA Charts')
wms.layers << Layer.new(name: "NOAA_Charts", title: "NOAA Charts", abstract: "This service provides a set of NOAA Charts for Alaskan waters.")

#Left for easy copy/paste
#wms << Layer.new(name: "", title: "", abstract: "")