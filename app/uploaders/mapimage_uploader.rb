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

  #process :brandImage, :if => :jpg?

  #process :brandGeotiff, :if => :geotiff?
  
  # Create different versions of your uploaded files:
  version :thumb do
    process :resize_to_fill => [160,120]
    process :quality => 85
    convert :jpg
    def full_filename (for_file = model.logo.file)
      "#{model.name}_thumb.jpg"
    end
  end
  
  version :jpg do
    convert :jpg   
    def full_filename (for_file = model.logo.file)
      "#{model.name}.jpg"
    end
  end
  
  version :world do 
    process :createWorldFile
    def full_filename (for_file = model.logo.file)
      "#{model.name}.jgw"
    end
  end
  
   version :auxxml do
    #process :createAuxXml
    def full_filename (for_file = model.logo.file)
      "#{model.name}.jpg.aux.xml"
    end
  end
  
  # version :proj do
  #   process :createProjFile
  #   def full_filename (for_file = model.logo.file)
  #     "#{model.name}.prj"
  #   end
  # end
  

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
  # def filename
  #   "#{model.name}.jpg"
  # end

  def brandImage
      wmimage = ::Magick::Image.read(
          "public/watermark/gina_logo_with_border.png" ).first
      cwvar = "public/watermark/#{model.layer.name.gsub(/\W/, "_")}_watermark.png"
      if File.exists?( cwvar )
        cwimg = ::Magick::Image.read( cwvar ).first
      else
        cwimg = ::Magick::Image.read("public/watermark/no_watermark.png" ).first
      end

      manipulate! do |img|
        img = img.dissolve( wmimage, 0.3, 0.3, ::Magick::SouthWestGravity,
            20, 20 )
        img = img.dissolve( cwimg, 0.3, 0.3, ::Magick::SouthEastGravity,
            20, 20 )
      end

      wmimage.destroy!
      cwimg.destroy! if cwimg
  end
 
  def brandGeotiff
    # capture geotags
    # burn logos
    # burn geotags back on
    # remove alpha channel?
  end
  
  #There is a lot of redundancy here,  how to clean it up?
  def createWorldFile
    # move upload to local cache
    cache_stored_file! if !cached?
    
    directory = File.dirname( current_path )
    
    # move upload to tmp file - encoding result will be saved to
    # original file name
    tmp_path   = File.join( directory, "tmpfile" )
    tmp_out = File.join( directory, "tmpout")
    File.rename current_path, tmp_path
    
    `gdal_translate -of JPEG -scale -co worldfile=yes #{tmp_path} #{current_path}`
    
    # because encoding video will change file extension, change it 
    # to old one
    fixed_name = File.basename(current_path, '.*') + ".wld"
    File.rename File.join( directory, fixed_name ), current_path
    
    # delete tmp file
    File.delete tmp_path
  end
  
  def createAuxXml
    # move upload to local cache
    cache_stored_file! if !cached?
    
    directory = File.dirname( current_path )
    
    # move upload to tmp file - encoding result will be saved to
    # original file name
    tmp_path   = File.join( directory, "tmpfile" )
    tmp_out = File.join( directory, "tmpout")
    File.rename current_path, tmp_path
    
    `gdal_translate -of JPEG -scale -co worldfile=yes #{tmp_path} #{current_path}`
    
    # because encoding video will change file extension, change it 
    # to old one
    fixed_name = File.basename(current_path, '.*') + ".jpg.aux.xml"
    File.rename File.join( directory, fixed_name ), current_path
    
    # delete tmp file
    File.delete tmp_path
  end
  
  def createProjFile
      
  end
 
protected
  def jpg? new_image
    new_image.content_type.include?("jpeg")
  end

  def geotiff? new_image
    new_image.content_type.include?("geotiff")
  end
end
