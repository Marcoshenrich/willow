require_relative 'easy_seeder'

#example from my own seed data
  
class_names = [User, Listing, Favorite]
class_image_names = [Listing, Listing]

EasySeeds.create_easy_seed_data(class_names)
EasySeeds.attach_images(class_image_names)


