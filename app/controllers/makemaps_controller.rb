class MakemapsController < ApplicationController

  def show
    @map = MapSave.where( :id => params["id"] ).first
    logger.info @map.inspect
    respond_to do |format|
      format.html 
      format.json { render :json => @map }
    end
  end

  def create
    mapsave = MapSave.new params["image"]
    map = MakeMapWMS.new params["image"]
    # Cache in carrierwave
    mapsave.mapimage.download! map.to_s
    #logger.info params.inspect
    if mapsave.save!
      respond_to do |format|
        format.js {render :json => {"success" => mapsave } }
      end
    end
  end

  def index
    @maps = MapSave.order("created_at DESC")

    respond_to do |format|
      format.html
      format.json { render :json => @maps }
    end
  end

end
