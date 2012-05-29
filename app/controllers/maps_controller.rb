class MapsController < ApplicationController
  respond_to :html
  
  def index
    @map = Map.new
    @maps = Map.all
  end
  
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
    
    # Cache in carrierwave
    @map.mapimage.download! @map.to_wms_query_string
    
    if @map.save
      respond_to do |format|
        if request.xhr?
          format.json {render :json => {success: true } }
        else
          format.json {render :json => {success: true}}  
        end
      end
    else
      respond_to do |format|
        if request.xhr?
          format.json {render :json => {success: false, errors: @map.errors}}
        else
          format.json {render :json => {success: false, errors: @map.errors}}
        end
      end
    end
  end
  
  #Makes a wms request for a small image to overlay on the current map
  def preview
    @map = Map.new mapParams

    respond_to do |format|
      format.json {render :json => {success: true, cachedImage: @map.to_wms_query_string, width: @map.width, height: @map.height}}
      #format.jpg @map.requestPreviewImage
    end
  end
  
  protected
  def mapParams
    params[:map].slice(:bbox, :name, :width, :height, :layer_id)
  end
end
