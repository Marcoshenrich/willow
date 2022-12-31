ApplicationRecord.transaction do 
  puts "Destroying tables..."
  # Unnecessary if using `rails db:seed:replant`
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
  Listing.create!(
      name: "Casa Concordia",
      available: true,
      street_num: "2101",
      street_name: "Shoreline Drive",
      city: "Alameda",
      zip: "94501",
      value: 100,
      beds: 2,
      posting_date: "2022-12-30", 
      description: "A pretty cool place to live",
      built: 1961,
      agent_id: 1,
      lat: 37.8272,
      long: 122.2913
  )

  puts "Done!"
end