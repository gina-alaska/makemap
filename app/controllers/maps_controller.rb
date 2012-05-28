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
  
  #Makes a wms request for a small image to overlay on the current map
  def preview
    @map = Map.new params[:map]
#    @map.layers = [Layer.where(:name => 'GINA.Bathymetry.bw').first]
    logger.info mapParams
    logger.info @map.inspect
    logger.info @map.to_wms_query_string
    
    respond_to do |format|
      format.json {render :json => {success: true, cachedImage: @map.to_wms_query_string, width: @map.width, height: @map.height}}
      #format.jpg @map.requestPreviewImage
    end
  end
  
  protected
  def mapParams
    params.slice(:map)
  end
end
