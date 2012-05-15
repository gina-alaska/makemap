class WelcomeController < ApplicationController
  def index
    @map = Map.new
  end
end
