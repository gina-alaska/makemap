Make Map
========

Tool to do simple map extractions from WMS.

* Developed by Scott Macfarlane, Will Fisher and Jason Grimes for the AlaskaView and
  AlaskaMapped projects.
* Geographic Information Network of Alaska (GINA)
  * http://www.gina.alaska.edu
  * http://www.alaskamapped.org
  * http://www.americaview.org

Description
-----------


Dependencies
------------
  GraphicsMagic
  libgeotiff
  gdal

  geotifcp, listgeo, and gdal_translate must be in your path or the image caching will fail.

Getting it running
------------------
    
  
    $ git clone # 
    # cd into it
    $ git submodule init
    $ git submodule update
    $ bundle install # install dependancies
    $ rake tmp:create

    # setup the database - for simple SQLITE devel mode:
    $ cp config/database.yml.example config/database.yml
    $ rake db:migrate
    # Edit db/seeds.rb, unless you want to use the default GINA WMS servers.
    $ rake db:seed
    

    # launch and test
    # This may fail to run when you attempt to make a map.  Webrick doesn't handle the long urls generated
    #  by the boundingbox parameter.  It is recommended you configure makemap to run under apache, nginx or pow (Mac)
    $ rackup 


License
-------

See LICENSE file for licensing and credits.  Think BSD/MIT.
