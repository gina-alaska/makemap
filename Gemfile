source 'http://rubygems.org'

gem 'rails', '3.2.2'

# Bundle edge Rails instead:
# gem 'rails',     :git => 'git://github.com/rails/rails.git'

gem 'sqlite3'
gem 'haml'
gem 'capistrano'
gem 'bootstrap-sass', '~> 2.1.0.0'
gem 'nofxx-georuby', :require => 'geo_ruby'

# Gems used only for assets and not required
# in production environments by default.
group :assets do
  gem 'sass-rails',   '~> 3.2.3'
  gem 'coffee-rails', '~> 3.2.1'
  gem 'uglifier', '>= 1.0.3'
  gem 'therubyracer'
end

gem 'jquery-rails'

# To use ActiveModel has_secure_password
# gem 'bcrypt-ruby', '~> 3.0.0'

# Use unicorn as the web server
# gem 'unicorn'

# Deploy with Capistrano
# gem 'capistrano'

# To use debugger
# gem 'ruby-debug19', :require => 'ruby-debug'

group :test do
  # Pretty printed test output
  gem 'turn', :require => false
end

#Parse xml repsonse from wms server
gem 'nokogiri'
gem 'kaminari'

# Carrierwave/imagemagick gems for image cache
gem 'carrierwave', :git => "git://github.com/jnicklas/carrierwave.git"
# ImageMagick GeoTiffs are broken, so we have to use GraphicsMagick.  RMagick doens't support it so we have to use MiniMagick
# MiniMagick master isn't accepting pull requests to fix compatability with GraphicsMagick so we have to use this fork.
gem 'mini_magick', :git => "git://github.com/fschwahn/mini_magick.git", :branch => "refactor_identify_errors"
