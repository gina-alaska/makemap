# encoding: utf-8

class MapimageUploader < CarrierWave::Uploader::Base
  COMPOSITE = "/usr/local/bin/gm composite"
  # Include RMagick or MiniMagick support:
  # include CarrierWave::RMagick
  include CarrierWave::MiniMagick

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

  #process :brandGeotiff, :if => :geotiff?
  
  # Create different versions of your uploaded files:
  version :thumb do
    process :resize_to_fill => [260,180]
    #process :quality => 85
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
    cache_stored_file! if !cached?
    
    directory = File.dirname( current_path )
    #Get our temporary files set up
    tmp_path = File.join(directory, "tmpfile")
    geo_file = File.join(directory, "geo_file")
    
    #Dump the geotiff information
    `listgeo #{current_path} > #{geo_file}`
    
    image = ::MiniMagick::Image.open(current_path)    
    wmimage = ::MiniMagick::Image.open("public/watermark/gina_logo_with_border.png")

    result = image.composite(wmimage) do |img|
      img.gravity "southwest"
      img.dissolve "30%"
      img.geometry "+20+20"
    end
    attribution = "#{model.layer.title} #{model.layer.attribution}"
    result.combine_options :convert do |img|
      img.fill "black"
      img.gravity "southeast"
      img.draw "text 19,19 '#{attribution}'"
    end
    
    result.combine_options :convert do |img|
      img.fill "orange"
      img.gravity "southeast"
      img.draw "text 20,20 '#{attribution}'"
    end
    

    # result = result.convert do |c|
    #   c.fill "blue"
    #   c.gravity "southeast"
    #   c.draw "text 20,20 Images (C) Respective Holders"
    # end
    result.write tmp_path
    
    #Brand the images
    #wmimage = ::Magick::Image.read(
    #    "public/watermark/gina_logo_with_border.png" ).first
    #cwvar = "public/watermark/#{model.layer.name.gsub(/\W/, "_")}_watermark.png"
    
    #Add the appropriate layer attributions
    #if File.exists?( cwvar )
    #  cwimg = ::Magick::Image.read( cwvar ).first
    #else
    #  cwimg = ::Magick::Image.read("public/watermark/no_watermark.png" ).first
    #end
    
    
    #Add the gina branding
    # manipulate! do |img|
    #   img = img.dissolve( wmimage, 0.3, 1.0, ::Magick::SouthWestGravity,
    #       20, 20 )
    #   #img = img.dissolve( cwimg, 0.3, 0.3, ::Magick::SouthEastGravity,
    #   #    20, 20 )
    # end
    
    #Add the geotiff information back into the image    puts "Renamed, sleeping..."
    
    `geotifcp -g #{geo_file} #{tmp_path} #{current_path}`    
#    wmimage.destroy!
   # cwimg.destroy! if cwimg
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
