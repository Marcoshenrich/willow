require_relative 'easy_seeder'



# Listing.first.images.attach(
#     io: URI.open("https://willow-seeds.s3.us-west-2.amazonaws.com/Houses/DragonDen/DragonDen-Living-Room.jpeg"), 
#     filename: "livingroom"
# )


#example from my own seed data
  
class_names = [User, Listing]


EasySeeds.create_easy_seed_data(class_names)


class_image_names = [Listing]

seed_folder = '../seed_image_files'

Dir.chdir(seed_folder)
Dir.glob("*").each do |seed_file|
    headers, data = EasySeeds.unpack_csvs(seed_file)

    data.each_with_index do |row, i|
        model_name, object_id, url, filename = row
        class_instance = class_image_names[0].find_by_id(object_id)
        class_instance.images.attach(io: URI.open(url), filename: filename)
    end

end


