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

    # launch and test
    $ rackup 

License
-------

See LICENSE file for licensing and credits.  Think BSD/MIT.
