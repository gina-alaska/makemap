class MapsController < ApplicationController
  respond_to :html
  
  def show
    @map = Map.where(:id => params[:id]).first
    
    respond_with @map
  end
  
  def download
    @map = Map.where(:id => params[:id]).first
    
    send_file @map.mapimage.file.file
  end
  
  def create
    @map = Map.new mapParams
    #TODO:  Merge MakeMapWMS into Map
    #map = MakeMapWMS.new mapParams
    # Cache in carrierwave
    @map.mapimage.download! map.to_s
    #logger.info params.inspect
    #if mapsave.save!
      respond_to do |format|
        format.js {render :json => {"success" => mapsave } }
      end
    #end
  end
  
  protected
  def mapParams
    params.slice[:map]
  end
end
