require "open-uri"


  puts "Destroying tables..."
  # Unnecessary if using `rails db:seed:replant`
  Listing.destroy_all
  User.destroy_all

  puts "Resetting primary keys..."
  # For easy testing, so that after seeding, the first `User` has `id` of 1
  ApplicationRecord.connection.reset_pk_sequence!('users')

  puts "Creating users..."
  # Create one user with an easy to remember username, email, and password:
  User.create!(
    username: 'PeriwinkleStar', 
    email: 'PeriwinkleStar@user.io', 
    password: 'password'
  )

  # More users
  10.times do 
    User.create!({
      username: Faker::Internet.unique.username(specifier: 3),
      email: Faker::Internet.unique.email,
      password: 'password'
    }) 
  end

  puts "Creating Listings"
  
  Listing.create!(
      name: "Casa Concordia",
      available: true,
      street_num: "2101",
      street_name: "Shoreline Drive",
      city: "Alameda",
      state: "CA",
      zip: "94501",
      posting_date: "2022-12-30", 
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis vel pulvinar velit, at luctus nisl. Suspendisse quis ligula consequat nunc semper finibus. Sed non ex quis felis eleifend molestie quis id ante. Duis vitae magna aliquet est aliquam luctus id et dui. Cras pharetra leo felis, eu semper felis tincidunt vitae. Ut nulla dolor, auctor euismod ex ut, fringilla vehicula purus. Maecenas vitae neque sit amet nibh hendrerit consectetur. Curabitur vitae nibh vitae lectus dapibus malesuada. Donec tellus felis, aliquam quis ultricies quis, rhoncus ac ex. Suspendisse non leo ac tortor rutrum porta quis in ligula. Nulla eget interdum velit. Nunc vulputate sem vitae ipsum pulvinar porttitor. Phasellus suscipit quis neque a dapibus.",
      agent_id: 1,
      lat: 37.8272,
      long: 122.2913,
      outdoors: "Pristine Glades",
      flowers: "Tulips",
      mushrooms: "Amonita",
      blessings: "Glitter",
      omens: "Croak of Toad",
      sqin: 130,
      num_rooms: 5,
      beds: 2,
      num_fireplaces: 2,
      built: 1961,
      fairy_dust: 40,
      human_teeth: 100,
      stolen_dreams: 35
  )

    puts "Attaching Images"

# The string passed to URI.open should be the URL of the image in its bucket.

  restaurants.each do |restaurant|
  restaurant.images.attach(
    io: URI.open("https://willow-dev-2.s3.us-west-2.amazonaws.com/1011-10113480_tinkle-fairy-fairies-wand-magic-wings-fly-star.png"), 
    filename: "1011-10113480_tinkle-fairy-fairies-wand-magic-wings-fly-star.png"
  )

  puts "Done!"


  #check if the csv has image attachments
  #if yes, seed completes then
   #iterate through the seed Restaurant.All
   #
