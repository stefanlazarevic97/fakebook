# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

ApplicationRecord.transaction do 
    puts "Destroying tables..."

    User.destroy_all

    puts "Resetting primary keys..."

    ApplicationRecord.connection.reset_pk_sequence!('users')

    puts "creating users with email, phone number, and bio..."

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

    puts "creating users with email and phone number but no bio..."

    5.times do 
        User.create!({
            first_name: Faker::Name.first_name,
            last_name: Faker::Name.last_name,
            email: Faker::Internet.unique.email,
            phone: Faker::PhoneNumber.cell_phone.gsub(/\D/, '').first(10),
            password: 'password'
        }) 
    end

    puts "creating users with email and bio but no phone number..."

    5.times do 
        User.create!({
            first_name: Faker::Name.first_name,
            last_name: Faker::Name.last_name,
            email: Faker::Internet.unique.email,
            bio: Faker::Lorem.paragraph(sentence_count: 2),
            password: 'password'
        }) 
    end

    puts "creating users with phone number and bio but no email..."

    5.times do 
        User.create!({
            first_name: Faker::Name.first_name,
            last_name: Faker::Name.last_name,
            phone: Faker::PhoneNumber.cell_phone.gsub(/\D/, '').first(10),
            bio: Faker::Lorem.paragraph(sentence_count: 2),
            password: 'password'
        }) 
    end

    puts "Done!"
end