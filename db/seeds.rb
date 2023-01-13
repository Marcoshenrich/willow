require_relative 'easy_seeder'

#example from my own seed data

Review.destroy_all
Appointment.destroy_all
Listing.destroy_all
User.destroy_all
  
class_names = [User, Listing, Appointment, Review]
class_image_names = [Listing]

EasySeeds.create_easy_seed_data(class_names)
EasySeeds.attach_images(class_image_names)


