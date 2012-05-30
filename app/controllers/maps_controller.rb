class MapsController < ApplicationController
  respond_to :html
  
  def index
    @map = Map.new
    @maps = Map.order("id DESC")
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
    logger.info(@map.to_wms_query_string)
    @map.mapimage.download! @map.to_wms_query_string
    
    if @map.save
      respond_to do |format|
        if request.xhr?
          format.json {render :json => {success: true, id: @map.id }, :layout => false}
        else
          format.json {render :json => {success: true, id: @map.id } } 
        end
      end
    else
      respond_to do |format|
        if request.xhr?
          format.json {render :json => {success: false, errors: @map.errors}, layout => false}
        else
          format.json {render :json => {success: false, errors: @map.errors}}
        end
      end
    end
  end
  
  #Makes a wms request for a small image to overlay on the current map
  def preview
    @map = Map.new mapParams
    @map.name = "preview"
    image = @map.to_wms_query_string(type: 'image/jpeg', ext: '.jpg')
    respond_to do |format|
      format.json {render :json => {success: true, cachedImage: image, width: @map.width, height: @map.height}}
      #format.jpg @map.requestPreviewImage
    end
  end
  
  protected
  def mapParams
    params[:map].slice(:bbox, :name, :width, :height, :layer_id)
  end
end
