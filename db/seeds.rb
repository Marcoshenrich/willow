require_relative 'easy_seeder'

#example from my own seed data
  
class_names = [User, Listing]
class_image_names = [Listing, Listing]

EasySeeds.create_easy_seed_data(class_names)
EasySeeds.attach_images(class_image_names)

# Appointment.create!(date_time: "2022-03-25T12:00:00-06:30", user_id: 8, listing_id: 1, agent_id: 1)


