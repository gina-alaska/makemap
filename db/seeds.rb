# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

wmss = []
wmss << WMS.create(hostname: 'http://wms.alaskamapped.org/bdl', shortname: 'Best Data Available')
wmss << WMS.create(hostname: 'http://wms.alaskamapped.org/extras', shortname: 'Extras')


wmss.each do |wms|
  wms.addLayersFromCapabilities
end
