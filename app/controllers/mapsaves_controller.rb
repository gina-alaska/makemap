class MapsavesController < ApplicationController
  respond_to :html
  
  def show
    @map = MapSave.where(:id => params[:id]).first
    
    respond_with @map
  end
  
  def download
    @map = MapSave.where(:id => params[:id]).first
    
    send_file @map.mapimage.file.file
  end
end
