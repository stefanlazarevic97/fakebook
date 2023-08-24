require 'open-uri'

users = []

puts "Destroying tables..."

User.destroy_all

puts "Resetting primary keys..."

ApplicationRecord.connection.reset_pk_sequence!('users')

puts "Creating demo user..."

user1 = User.create!({
    first_name: 'Demo',
    last_name: 'User',
    bio: 'A placeholder user to demonstrate application functionality. Feel free to explore the site, change your profile picture/cover photo, create posts, add friends (or accept friend requests from other users), leave comments on posts/reply to other comments, and react to posts/comments.)',
    email: 'demo@user.io',
    phone: '4155559072',
    password: 'demo-password'
})

users << user1

puts "Creating more users..."

user2 = User.create!({
    first_name: 'Justin',
    last_name: 'Bieber',
    bio: "Embracing melodies since '94. Not just a pop sensation, but a journey of faith, love, and purpose. #BelieberFamily 🎶✨",
    email: 'justin@bieber.com',
    phone: '4029230125',
    password: 'justin-bieber'
})

users << user2

user3 = User.create!({
    first_name: 'Serena',
    last_name: 'Williams',
    bio: "Smashing barriers on and off the court. 23-time Grand Slam champion, entrepreneur, and proud mom. Driven by passion, fueled by resilience. Striving to make every serve and every day count. #RenasArmy 🎾👑",
    email: 'serena@williams.com',
    phone: '9477821043',
    password: 'serena-williams'
})

users << user3

user4 = User.create!({
    first_name: 'Lewis',
    last_name: 'Hamilton',
    bio: "Speeding through life on and off the track. 7-time Formula 1 World Champion with a passion for fashion and activism. #TeamLH 🏎️",
    email: 'lewis@hamilton.com',
    phone: '8472921843',
    password: 'lewis-hamilton'
})

users << user4

user5 = User.create!({
    first_name: 'Leonardo',
    last_name: 'DiCaprio',
    bio: "Actor, producer, and environmental advocate. Striving for excellence in storytelling while protecting Mother Earth.",
    email: 'leonardo@dicaprio.com',
    phone: '9017238492',
    password: 'leonardo-dicaprio'
})

users << user5

user6 = User.create!({
    first_name: 'Stephen',
    last_name: 'Curry',
    bio: "Two-time MVP, four-time NBA champion. A husband, father, and advocate for positive change. #DubNation 🏀🙏",
    email: 'stephen@curry.com',
    phone: '7012947123',
    password: 'stephen-curry'
})

users << user6

user7 = User.create!({
    first_name: 'Taylor',
    last_name: 'Swift',
    bio: "Singer-songwriter, 10-time Grammy winner. Writing the soundtrack to your life and standing up for creators. Love my swifties!",
    email: 'taylor@swift.com',
    phone: '3092147293',
    password: 'taylor-swift'
})

users << user7

user8 = User.create!({
    first_name: 'Barack',
    last_name: 'Obama',
    bio: "44th President of the United States. Author, lawyer, and advocate for change. Family man with a deep love for hoops. #Hope 🇺🇸📚",
    email: 'barack@obama.com',
    phone: '4327891345',
    password: 'barack-obama'
})

users << user8

user9 = User.create!({
    first_name: 'Novak',
    last_name: 'Djokovic',
    bio: "23-time Grand Slam winner, pushing the boundaries of tennis. Passionate about mental well-being and nutrition. #NoleFam 🎾🌱",
    email: 'novak@djokovic.com',
    phone: '7521438902',
    password: 'novak-djokovic'
})

users << user9

user10 = User.create!({
    first_name: 'Cristiano',
    last_name: 'Ronaldo',
    bio: "Soccer legend, entrepreneur, and philanthropist. Committed to excellence and inspiring the next generation. #CR7 ⚽🌟",
    email: 'cristiano@ronaldo.com',
    phone: '9987451203',
    password: 'cristiano-ronaldo'
})

users << user10

user11 = User.create!({
    first_name: 'Kim',
    last_name: 'Kardashian',
    bio: "Reality TV star turned entrepreneur and advocate. Passionate about beauty, fashion, and social justice.",
    email: 'kim@kardashian.com',
    phone: '9021034576',
    password: 'kim-kardashian'
})

users << user11

user12 = User.create!({
    first_name: 'Margot',
    last_name: 'Robbie',
    bio: "Actress and producer. On a quest to bring strong, diverse female roles to the silver screen.",
    email: 'margot@robbie.com',
    phone: '3045987124',
    password: 'margot-robbie'
})

users << user12

user13 = User.create!({
    first_name: 'Elon',
    last_name: 'Musk',
    bio: "Innovator, entrepreneur, and space enthusiast. Founder of SpaceX, Tesla, and many more. Striving for a sustainable future on Earth and Mars.",
    email: 'elon@musk.com',
    phone: '2039174023',
    password: 'elon-musk'
})

users << user13

puts "Giving users a profile picture and a cover photo..."

users.each do |user|
    user.profile_picture.attach(io: URI.open("https://fakebook-app-seeds.s3.us-west-1.amazonaws.com/user-photos/profile-picture-#{user.id}.png"), filename: "profile-picture-#{user.id}.png")
    user.cover_photo.attach(io: URI.open("https://fakebook-app-seeds.s3.us-west-1.amazonaws.com/user-photos/cover-photo-#{user.id}.png"), filename: "cover-photo-#{user.id}.png")
end

puts "Creating sample posts..."

def add_post(user_id, body, created_at)
    post = Post.create!({
        author_id: user_id,
        body: body
    })

    post.created_at = created_at
    post.save!

    return post
end

post1 = add_post(user1.id, "What a fascinating social media application! I'm so glad I decided to create an account. I can't wait to see what my friends are up to!", "2023-08-23 17:46:12 UTC")

post2 = add_post(user1.id, "Check out the delicious dinner I had tonight. I'm so grateful to have such a wonderful family. #blessed", "2023-08-24 09:30:11 UTC")

post2.photos.attach(io: URI.open("https://fakebook-app-seeds.s3.us-west-1.amazonaws.com/post-photos/post-photo-2.png"), filename: "post-photo-2.png")

post3 = add_post(user2.id, "I'm so excited to announce that I'm going on tour! I can't wait to see all of my fans again. I've missed you all so much!", "2022-01-15 15:21:45 UTC")

post4 = add_post(user2.id, "Great night last night! Thank you New York! #PurposeTour", "2016-07-19 19:34:22 UTC")

(0..2).each do |i|
    post4.photos.attach(io: URI.open("https://fakebook-app-seeds.s3.us-west-1.amazonaws.com/post-photos/post-photo-4-#{i}.png"), filename: "post-photo-4-#{i}.png")
end

post5 = add_post(user2.id, "Big news! My new album 'Purpose' is coming out on November 13th. Can't wait for you all to hear it!", "2015-10-09 16:27:13 UTC")

post6 = add_post(user2.id, "So grateful for this next chapter in my life. Excited to announce that Hailey and I are engaged! ❤️", "2018-07-10 18:53:47 UTC")

post6.photos.attach(io: URI.open("https://fakebook-app-seeds.s3.us-west-1.amazonaws.com/post-photos/post-photo-6.png"), filename: "post-photo-6.png")

post7 = add_post(user2.id, "My new album 'Justice' is out now! Hope it resonates with you. #Justice", "2021-03-19 14:43:09 UTC")

post8 = add_post(user3.id, "Came up short this time, but it's all part of the journey. Grateful for all the love and support. #RenasArmy 🎾", "2021-07-08 19:46:29 UTC")

post9 = add_post(user3.id, "Thrilled to introduce my new fashion line! It's been a labor of love. Can't wait for you all to see it.", "2020-02-25 14:12:33 UTC")

(0..5).each do |i|
    post9.photos.attach(io: URI.open("https://fakebook-app-seeds.s3.us-west-1.amazonaws.com/post-photos/post-photo-9-#{i}.png"), filename: "post-photo-9-#{i}.png")
end

post10 = add_post(user3.id, "Had an amazing weekend with family. There's nothing more precious than quality time with loved ones.", "2022-06-05 17:09:23 UTC")

post11 = add_post(user4.id, "Incredible race today! Grateful to the whole team and all of my fans. This one's for you! #TeamLH 🏎️", "2021-03-28 18:27:45 UTC")

(0..2).each do |i|
    post11.photos.attach(io: URI.open("https://fakebook-app-seeds.s3.us-west-1.amazonaws.com/post-photos/post-photo-11-#{i}.png"), filename: "post-photo-11-#{i}.png")
end

post12 = add_post(user4.id, "It's more important than ever to take steps for a sustainable future. Proud to be a part of initiatives making a difference. Let's be the change we want to see. #ActOnClimate", "2020-04-22 10:31:28 UTC")

post13 = add_post(user4.id, "Excited to unveil my latest collaboration with Tommy Hilfiger. Can't wait for you all to see it.", "2019-09-03 14:59:08 UTC")

post13.photos.attach(io: URI.open("https://fakebook-app-seeds.s3.us-west-1.amazonaws.com/post-photos/post-photo-13.png"), filename: "post-photo-13.png")

post14 = add_post(user4.id, "We must all do our part to fight against racism and inequality. Silence is complicit. #BlackLivesMatter", "2020-06-02 09:43:11 UTC")

post15 = add_post(user5.id, "The science is clear. We need urgent action to combat the climate crisis. Let's protect our planet for future generations. #ClimateAction 🌏", "2019-09-23 12:17:43 UTC")

post16 = add_post(user5.id, "Honored that 'Before the Flood' won at the Environmental Media Awards. It's time we all stand up for our planet.", "2017-05-14 18:53:23 UTC")

post16.photos.attach(io: URI.open("https://fakebook-app-seeds.s3.us-west-1.amazonaws.com/post-photos/post-photo-16.png"), filename: "post-photo-16.png")

post17 = add_post(user5.id, "Excited to announce the premiere of 'Once Upon a Time in Hollywood'. Can't wait for you all to see it!", "2019-07-22 14:38:19 UTC")

post18 = add_post(user6.id, "We did it again! 2018 NBA Champions! Grateful to God and thankful for my team. #DubNation 🏀🏆", "2018-06-09 11:23:45 UTC")

(0..3).each do |i|
    post18.photos.attach(io: URI.open("https://fakebook-app-seeds.s3.us-west-1.amazonaws.com/post-photos/post-photo-18-#{i}.png"), filename: "post-photo-18-#{i}.png")
end

post19 = add_post(user6.id, "Family time is the best time. Enjoying a beautiful day out with my loved ones.", "2021-04-18 17:02:38 UTC")

post20 = add_post(user6.id, "We need to speak up and act for those who can't. Let's continue the fight for equality. #BlackLivesMatter ✊🏾", "2020-06-03 15:41:27 UTC")

post21 = add_post(user6.id, "Excited to reveal the new Curry 9s! They're all about performance and comfort. Hope you guys like them!", "2022-09-10 16:57:09 UTC")

post21.photos.attach(io: URI.open("https://fakebook-app-seeds.s3.us-west-1.amazonaws.com/post-photos/post-photo-21.png"), filename: "post-photo-21.png")

post22 = add_post(user6.id, "Blessed to have scored 62 points in last night's game. Couldn't have done it without my team. #DubNation 🙏", "2021-01-04 09:33:12 UTC")

post23 = add_post(user7.id, "Surprise! My new album 'evermore' drops tonight at midnight. Can't wait for you all to hear it! 🎶", "2020-12-10 14:27:13 UTC")

(0..2).each do |i|
    post23.photos.attach(io: URI.open("https://fakebook-app-seeds.s3.us-west-1.amazonaws.com/post-photos/post-photo-23-#{i}.png"), filename: "post-photo-23-#{i}.png")
end

post24 = add_post(user7.id, "Thank you to everyone who came out to the Reputation Stadium Tour. Your energy was amazing! #repTour 🎤🎉", "2018-11-21 22:43:17 UTC")

post25 = add_post(user7.id, "Artists should own their own work for so many reasons, but the most screamingly obvious one is that the artist is the only one who really *knows* that body of work. #ArtistsRights", "2019-06-30 16:04:29 UTC")

post26 = add_post(user8.id, "Thank you, America! This is your victory! Yes, we can!", "2008-11-05 01:02:30 UTC")

post27 = add_post(user8.id, "Today is a big step in our march toward equality. Health care is not a privilege for a few, but a right for all. #AffordableCareAct", "2010-03-23 19:28:41 UTC")

post28 = add_post(user8.id, "I'm proud to announce my new memoir, 'A Promised Land,' out on November 17th. I hope it offers some insight into the events and people that shaped my presidency.", "2020-09-17 10:33:57 UTC")

post28.photos.attach(io: URI.open("https://fakebook-app-seeds.s3.us-west-1.amazonaws.com/post-photos/post-photo-28.png"), filename: "post-photo-28.png")

post29 = add_post(user9.id, "Humbled and honored to win my 8th Australian Open. Grateful for the love and support! 🎾", "2020-02-02 20:41:09 UTC")

(0..4).each do |i|
    post29.photos.attach(io: URI.open("https://fakebook-app-seeds.s3.us-west-1.amazonaws.com/post-photos/post-photo-29-#{i}.png"), filename: "post-photo-29-#{i}.png")
end

post30 = add_post(user9.id, "Mental strength is just as important as physical strength in tennis. Always take time to focus on your well-being. #MentalHealth", "2021-05-12 11:05:36 UTC")

post31 = add_post(user9.id, "Remember, you are what you eat. Taking care of your body starts with good nutrition. 🌱", "2021-09-07 17:26:41 UTC")

post32 = add_post(user9.id, "Thrilled to win another Wimbledon. Thank you all for your support! #NoleFam", "2019-07-14 15:21:09 UTC")

(0..4).each do |i|
    post32.photos.attach(io: URI.open("https://fakebook-app-seeds.s3.us-west-1.amazonaws.com/post-photos/post-photo-32-#{i}.png"), filename: "post-photo-32-#{i}.png")
end

post33 = add_post(user9.id, "We all have a part to play in fighting COVID-19. Donating to support medical workers in Serbia. Let's stand together!", "2020-03-27 12:03:56 UTC")

post34 = add_post(user10.id, "Excited to start a new chapter with Juventus! ⚽🌟", "2018-07-10 13:21:47 UTC")

post34.photos.attach(io: URI.open("https://fakebook-app-seeds.s3.us-west-1.amazonaws.com/post-photos/post-photo-34.png"), filename: "post-photo-34.png")

post35 = add_post(user10.id, "Your love makes me strong, your hate makes me unstoppable. 💪 #CR7", "2021-08-17 09:37:52 UTC")

post36 = add_post(user10.id, "Proud to announce my new fragrance. #CR7Fragrance", "2019-09-13 17:18:35 UTC")

post36.photos.attach(io: URI.open("https://fakebook-app-seeds.s3.us-west-1.amazonaws.com/post-photos/post-photo-36.png"), filename: "post-photo-36.png")

post37 = add_post(user10.id, "Family time is the best time. Love these moments.", "2020-12-25 10:15:29 UTC")

post37.photos.attach(io: URI.open("https://fakebook-app-seeds.s3.us-west-1.amazonaws.com/post-photos/post-photo-37.png"), filename: "post-photo-37.png")

post38 = add_post(user11.id, "So thrilled to announce the launch of KKW Beauty! 💄", "2017-06-21 14:05:43 UTC")

(0..2).each do |i|
    post38.photos.attach(io: URI.open("https://fakebook-app-seeds.s3.us-west-1.amazonaws.com/post-photos/post-photo-38-#{i}.png"), filename: "post-photo-38-#{i}.png")
end

post39 = add_post(user11.id, "Visited the White House today to discuss criminal justice reform. Let's make a change!", "2019-06-13 19:24:10 UTC")

post40 = add_post(user11.id, "Sunday is for family. So blessed. ❤️", "2021-02-21 11:02:17 UTC")

post41 = add_post(user12.id, "Absolutely thrilled for the success of 'I, Tonya'. What a journey!", "2018-03-02 16:37:41 UTC")

(0..1).each do |i|
    post41.photos.attach(io: URI.open("https://fakebook-app-seeds.s3.us-west-1.amazonaws.com/post-photos/post-photo-41-#{i}.png"), filename: "post-photo-41-#{i}.png")
end

post42 = add_post(user12.id, "It's time for more strong female leads. Let's change the narrative. #WomenInFilm", "2020-01-25 09:13:20 UTC")

post42.photos.attach(io: URI.open("https://fakebook-app-seeds.s3.us-west-1.amazonaws.com/post-photos/post-photo-42.png"), filename: "post-photo-42.png")

post43 = add_post(user12.id, "We have only one planet. Let's treat it with care. 🌎", "2021-04-22 12:30:09 UTC")

post44 = add_post(user13.id, "The Model 3 has arrived. Affordable and sustainable energy is now a reality!", "2017-07-29 15:48:31 UTC")

(0..2).each do |i|
    post44.photos.attach(io: URI.open("https://fakebook-app-seeds.s3.us-west-1.amazonaws.com/post-photos/post-photo-44-#{i}.png"), filename: "post-photo-44-#{i}.png")
end

post45 = add_post(user13.id, "Falcon Heavy launch was a success! Next stop, Mars 🚀", "2018-02-06 19:27:43 UTC")

post45.photos.attach(io: URI.open("https://fakebook-app-seeds.s3.us-west-1.amazonaws.com/post-photos/post-photo-45.png"), filename: "post-photo-45.png")

post46 = add_post(user13.id, "Neuralink will change the way we interact with technology. The future is now. #Neuralink", "2020-08-29 17:16:54 UTC")

post46.photos.attach(io: URI.open("https://fakebook-app-seeds.s3.us-west-1.amazonaws.com/post-photos/post-photo-46.png"), filename: "post-photo-46.png")

post47 = add_post(user13.id, "Climate change is the biggest threat we face. It's time for sustainable energy solutions.", "2021-06-21 20:11:57 UTC")

# user_ids = User.pluck(:id)

# user_ids.each do |user_id|
#     rand(1..5).times do
#         Post.create!({
#         author_id: user_id,
#         body: Faker::Lorem.paragraph(sentence_count: rand(1..3))
#         })
#     end
# end

# puts "Sample posts created!"

# puts "Creating sample friendships..."

# desired_friendships = 100
# created_friendships = 0

# unique_pairs = []

# while created_friendships < desired_friendships
#     user1_id, user2_id = user_ids.sample(2)

#     next if unique_pairs.include?([user1_id, user2_id]) || unique_pairs.include?([user2_id, user1_id]) || user1_id == user2_id

#     friendship = Friendship.new(user_id: user1_id, friend_id: user2_id, status: 'accepted')

#     if friendship.save
#         created_friendships += 1
#         unique_pairs << [user1_id, user2_id]
#     end
# end

# puts "Creating sample top-level comments..."

# post_ids = Post.pluck(:id)

# user_ids.each do |user_id|
#     rand(1..5).times do
#         Comment.create!({
#         commenter_id: user_id,
#         post_id: post_ids.sample,
#         body: Faker::Lorem.paragraph(sentence_count: rand(1..3))
#         })
#     end
# end

puts "Done!"
