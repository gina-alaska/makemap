class MakemapsController < ApplicationController
  def show
    map = MakeMapWMS.new params
    redirect_to map.to_s, :status => 302
  end


end