class WelcomeController < ApplicationController
  def index
    @map = MapSave.new
  end
end
