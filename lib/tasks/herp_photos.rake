namespace :imports do

  desc "Import photos from herpmapper"
  task herp_photos: :environment do
    done = 0
    puts "Staring import of herp mapper photos"
    # base = '/herpmapper2/species/'
    base = '/Users/n8ta/Desktop/herp/species/'

    def handle_dir(species_dir,base)
      # base = '/herpmapper2/species'
      return if species_dir == "." or species_dir == ".." or species_dir == ".DS_Store"
      name = species_dir.titleize
      begin
        specie = Taxon.find_by(name: name)
        puts "Specie: "+specie.inspect
        Dir.entries(base + species_dir).each do |photo_name|
          begin
            next if photo_name == "." or photo_name == ".." or species_dir == ".DS_Store"

            photo = Photo.new(taxon: specie)


            if photo_name[0] == 'a'
              photo.dead = false
            elsif photo_name[0] == 'd'
              photo.dead = true
            end

            path = base + species_dir + '/' + photo_name
            photo.image_path = Pathname.new(path).open
            photo.save!
          rescue => e
            puts e.message
            puts e.backtrace.join("\n")
            puts "Failed on " + species_dir.to_s + " " + photo_name.to_s
            next
          end
        end
      rescue => error
        puts error.message
        puts error.backtrace.join("\n")
        puts "Failed on: " + species_dir.to_s
        return
      end
    end

    done = 0
    len = Dir.entries(base).length
    Dir.entries(base).each do |species_dir|
      done += 1
      puts len
      puts done
      handle_dir(species_dir,base)
    end


  end
end