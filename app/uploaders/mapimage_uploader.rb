# encoding: utf-8

class MapimageUploader < CarrierWave::Uploader::Base

  # Include RMagick or MiniMagick support:
  include CarrierWave::RMagick
  # include CarrierWave::MiniMagick

  # Choose what kind of storage to use for this uploader:
  storage :file
  # storage :fog

  # Override the directory where uploaded files will be stored.
  # This is a sensible default for uploaders that are meant to be mounted:
  def store_dir
    "uploads/#{model.class.to_s.underscore}/#{mounted_as}/#{model.id}"
  end
  
  # Provide a default URL as a default if there hasn't been a file uploaded:
  # def default_url
  #   "/images/fallback/" + [version_name, "default.png"].compact.join('_')
  # end

  # Process files as they are uploaded:
  # process :scale => [200, 300]
  #
  # def scale(width, height)
  #   # do something
  # end

  process :brandImage

  # Create different versions of your uploaded files:
  version :thumb do
    process :resize_to_fill => [200, 200]
    process :quality => 85
    convert :jpg
  end

  # Add a white list of extensions which are allowed to be uploaded.
  # For images you might use something like this:
  # def extension_white_list
  #   %w(jpg jpeg gif png)
  # end

  # Override the filename of the uploaded files:
  # Avoid using model.id or version_name here, see uploader/store.rb for details.
  # def filename
  #   "something.jpg" if original_filename
  # end

  def brandImage
      wmimage = ::Magick::Image.read(
          "public/watermark/gina_logo_with_border.png" )
      copyimg = ::Magick::Draw.new
      copytext = ["imagery (c) respective holders"]
      copytext.push "http://alaskamapped.org/bdl"

      manipulate! do |img|
        img = img.dissolve( wmimage[0], 0.5, 0.5, ::Magick::SouthWestGravity,
            20, 20 )
        img = img.annotate( copyimg, 0, 0, 18, 18, copytext.join("\n") ) do
          self.font_family = 'Helvetica'
          self.fill = 'black'
          self.stroke = 'transparent'
          self.pointsize = 16
          self.font_weight = ::Magick::BoldWeight
          self.gravity = ::Magick::SouthEastGravity
        end
        img = img.annotate( copyimg, 0, 0, 20, 20, copytext.join("\n") ) do
          self.font_family = 'Helvetica'
          self.fill = 'white'
          self.stroke = 'transparent'
          self.pointsize = 16
          self.font_weight = ::Magick::BoldWeight
          self.gravity = ::Magick::SouthEastGravity
        end
      end

#      copyimg.destroy!
      wmimage[0].destroy!
  end

end
