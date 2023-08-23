require 'open-uri'

puts "Destroying tables..."

User.destroy_all

puts "Resetting primary keys..."

ApplicationRecord.connection.reset_pk_sequence!('users')

puts "Creating demo user..."

User.create!({
        first_name: 'Demo',
        last_name: 'User',
        bio: 'A placeholder user to demonstrate application functionality.',
        email: 'demo@user.io',
        phone: '4155559072',
        password: 'demo-password'
    })

puts "Creating users with email, phone number, and bio..."

5.times do 
    User.create!({
        first_name: Faker::Name.first_name,
        last_name: Faker::Name.last_name,
        email: Faker::Internet.unique.email,
        phone: Faker::PhoneNumber.cell_phone.gsub(/\D/, '').first(10),
        bio: Faker::Lorem.paragraph(sentence_count: 2),
        password: 'password'
    }) 
end

puts "Creating users with email and phone number but no bio..."

5.times do 
    User.create!({
        first_name: Faker::Name.first_name,
        last_name: Faker::Name.last_name,
        email: Faker::Internet.unique.email,
        phone: Faker::PhoneNumber.cell_phone.gsub(/\D/, '').first(10),
        password: 'password'
    }) 
end

puts "Creating users with email and bio but no phone number..."

5.times do 
    User.create!({
        first_name: Faker::Name.first_name,
        last_name: Faker::Name.last_name,
        email: Faker::Internet.unique.email,
        bio: Faker::Lorem.paragraph(sentence_count: 2),
        password: 'password'
    }) 
end

puts "Creating users with phone number and bio but no email..."

5.times do 
    User.create!({
        first_name: Faker::Name.first_name,
        last_name: Faker::Name.last_name,
        phone: Faker::PhoneNumber.cell_phone.gsub(/\D/, '').first(10),
        bio: Faker::Lorem.paragraph(sentence_count: 2),
        password: 'password'
    }) 
end

puts "Giving each user a random profile picture and cover photo..."

User.all.each do |user|
    user.profile_picture.attach(io: URI.open(Faker::Avatar.image(slug: user.first_name, size: "150x150", format: "png", set: "set4")), filename: "#{user.first_name}_profile_picture.png")
    # user.cover_photo.attach(io: URI.open(Faker::LoremPixel.image(size: "1200x400", is_random: true)), filename: "#{user.first_name}_cover_photo.png")
end

puts "Creating sample posts..."

user_ids = User.pluck(:id)

user_ids.each do |user_id|
    rand(1..5).times do
        Post.create!({
        author_id: user_id,
        body: Faker::Lorem.paragraph(sentence_count: rand(1..3))
        })
    end
end

puts "Sample posts created!"

puts "Creating sample friendships..."

desired_friendships = 100
created_friendships = 0

unique_pairs = []

while created_friendships < desired_friendships
    user1_id, user2_id = user_ids.sample(2)

    next if unique_pairs.include?([user1_id, user2_id]) || unique_pairs.include?([user2_id, user1_id]) || user1_id == user2_id

    friendship = Friendship.new(user_id: user1_id, friend_id: user2_id, status: 'accepted')

    if friendship.save
        created_friendships += 1
        unique_pairs << [user1_id, user2_id]
    end
end

puts "Creating sample top-level comments..."

post_ids = Post.pluck(:id)

user_ids.each do |user_id|
    rand(1..5).times do
        Comment.create!({
        commenter_id: user_id,
        post_id: post_ids.sample,
        body: Faker::Lorem.paragraph(sentence_count: rand(1..3))
        })
    end
end

puts "Done!"
