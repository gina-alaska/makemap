class WelcomeController < ApplicationController
  def index
    @map = Map.new
    @layers = Layer.all
  end
end
