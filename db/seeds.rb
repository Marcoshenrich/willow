require_relative 'easy_seeder'

Review.destroy_all
Appointment.destroy_all
Listing.destroy_all
User.destroy_all

ActiveRecord::Base.connection.tables.each do |t|
  ActiveRecord::Base.connection.reset_pk_sequence!(t)
end
  
class_names = [User, Listing, Appointment, Review]
class_image_names = [Listing]

EasySeeds.create_easy_seed_data(class_names)
EasySeeds.attach_images(class_image_names)


