class MakemapsController < ApplicationController

  def show
    map = MakeMapWMS.new params
    redirect_to map.to_s, :status => 302
  end

  def create
    mapsave = MapSave.new params["image"]
    map = MakeMapWMS.new params["image"]
    logger.info params.inspect
#    respond_to do |format|
#      format.json { render :json => {"success"=>true} }
#    end
    if mapsave.save!
      redirect_to map.to_s, :status => 302
    end
  end

end
