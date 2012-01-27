class MakemapsController < ApplicationController

  def show
    map = MapSave.where( :id => params["id"] )
    logger.info map.inspect
    respond_to do |format|
      format.json { render :json => map }
    end
  end

  def create
    mapsave = MapSave.new params["image"]
    map = MakeMapWMS.new params["image"]
    logger.info params.inspect
    if mapsave.save!
      redirect_to map.to_s, :status => 302
    end
  end

  def index
    maps = MapSave.all
    logger.info maps.inspect
    respond_to do |format|
      format.json { render :json => maps }
    end
  end

end
