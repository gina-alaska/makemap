class MapsController < ApplicationController
  respond_to :html, :json
  
  def index
    @maps = Map.order("created_at DESC").page(params[:page])
    if params[:mine] # and !cookies[:makemap].nil?
      @maps = @maps.where(:id => cookies[:makemap].try(:split, ","))
    end
  end
  
  def show
    @map = Map.where(:id => params[:id]).first
    
    if request.xhr?
      respond_with @map, :layout => false
    else
      respond_with @map
    end
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
      if cookies[:makemap].nil?
        cookies[:makemap] = @map.id
      else
        cookies[:makemap] += ",#{@map.id}"
      end
      if request.xhr?
        render :json => {success: true, id: @map.id }, :layout => false, :status => :accepted
      else
        render :json => {success: true, id: @map.id }, :status => :accepted
      end
    else
      if request.xhr?
        render :json => {success: false, errors: @map.errors}, :layout => false, :status => :rejected
      else
        render :json => {success: false, errors: @map.errors}, :status => :rejected
      end
    end
  end
  
  #Makes a wms request for a small image to overlay on the current map
  def preview
    @map = Map.new mapParams
    @map.name = "preview"
    image = @map.to_wms_query_string(type: 'image/jpeg', ext: '.jpg')
    
    render :json => {success: true, cachedImage: image, width: @map.width, height: @map.height}, :layout => false
  end
  
  protected
  def mapParams
    params[:map].slice(:bbox, :name, :width, :height, :layer_id)
  end
end
