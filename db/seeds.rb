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

post8 = add_post(user3.id, "Came up short this time, but it's all part of the journey. Grateful for all the love and support. #RenasArmy 🎾", "2019-07-13 19:46:29 UTC")

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

puts "Creating sample top-level (parent) comments..."

def add_comment(user_id, post_id, body, created_at)
    comment = Comment.create!({
        commenter_id: user_id,
        post_id: post_id,
        body: body,
        parent_comment_id: nil
    })

    comment.created_at = created_at
    comment.save!
    
    return comment
end

comment1 = add_comment(user5.id, post2.id, "That dinner looks amazing! Family dinners are the best. #FamilyFirst", "2023-08-24 09:35:00 UTC")

comment2 = add_comment(user12.id, post2.id, "Well done!", "2023-08-24 09:42:19 UTC")

comment3 = add_comment(user10.id, post3.id, "Can't wait to catch you on tour! 🎶", "2022-01-15 15:22:12 UTC")

comment4 = add_comment(user9.id, post4.id, "Amazing energy last night, keep it up!", "2016-07-19 19:49:58 UTC")

comment5 = add_comment(user7.id, post6.id, "Congratulations on the engagement! Wishing you both nothing but happiness. 💍", "2018-07-10 18:58:32 UTC")

comment6 = add_comment(user4.id, post6.id, "I better get an invite to the wedding.", "2018-07-10 19:01:42 UTC")

comment7 = add_comment(user3.id, post7.id, "Already listening on repeat! #Justice", "2021-03-19 14:48:26 UTC")

comment8 = add_comment(user5.id, post8.id, "You're a champion, no matter what. Keep going! 🎾", "2019-07-13 19:52:49 UTC")

comment9 = add_comment(user12.id, post8.id, "Unlucky today. Check out this cool shot I got of you though!", "2019-07-13 19:52:03 UTC")

comment9.photo.attach(io: URI.open("https://fakebook-app-seeds.s3.us-west-1.amazonaws.com/comment-photos/comment-photo-9.png"), filename: "comment-photo-9.png")

comment10 = add_comment(user3.id, post9.id, "Congratulations! Can't wait to see it.", "2020-02-25 14:15:20 UTC")

comment11 = add_comment(user6.id, post10.id, "Family is everything. Beautiful post!", "2022-06-05 17:15:46 UTC")

comment12 = add_comment(user2.id, post11.id, "Fantastic race, well done! 🏎️", "2021-03-28 18:33:54 UTC")

comment13 = add_comment(user7.id, post11.id, "Legend!", "2021-03-28 18:35:52 UTC")

comment14 = add_comment(user5.id, post11.id, "Unbeatable performance!", "2021-03-28 19:01:43 UTC")

comment15 = add_comment(user5.id, post12.id, "Inspirational words, Lewis. Climate change can't be ignored.", "2020-04-22 10:36:21 UTC")

comment16 = add_comment(user11.id, post13.id, "Great game! Loved the teamwork.", "2019-06-15 20:44:59 UTC")

comment17 = add_comment(user7.id, post14.id, "Well said, Lewis. We must all raise our voices. #BlackLivesMatter", "2020-06-02 09:49:37 UTC")

comment18 = add_comment(user11.id, post15.id, "Thank you for using your platform for such an important cause. #ClimateAction", "2019-09-23 12:23:11 UTC")

comment19 = add_comment(user8.id, post16.id, "Congratulations on the win! The film is a much-needed eye-opener. This was my favourite scene!", "2017-05-14 18:59:05 UTC")

comment19.photo.attach(io: URI.open("https://fakebook-app-seeds.s3.us-west-1.amazonaws.com/comment-photos/comment-photo-19.png"), filename: "comment-photo-19.png")

comment20 = add_comment(user10.id, post16.id, "Can't wait to watch it!", "2017-05-14 19:20:18 UTC")

comment21 = add_comment(user6.id, post17.id, "Your fashion sense is impeccable! This was one of your best looks.", "2019-02-20 13:25:47 UTC")

comment21.photo.attach(io: URI.open("https://fakebook-app-seeds.s3.us-west-1.amazonaws.com/comment-photos/comment-photo-21.png"), filename: "comment-photo-21.png")

comment22 = add_comment(user13.id, post18.id, "Congratulations! Well-deserved victory. #DubNation 🏀", "2018-06-09 11:29:32 UTC")

comment23 = add_comment(user12.id, post18.id, "Just spectacular! Your talent knows no bounds.", "2018-01-10 15:09:55 UTC")

comment24 = add_comment(user9.id, post20.id, "Absolutely, let's keep fighting for equality. ✊", "2020-06-03 15:47:21 UTC")

comment25 = add_comment(user11.id, post21.id, "Those shoes look amazing! Hopefully you can recreate this colorway!", "2022-09-10 17:02:14 UTC")

comment25.photo.attach(io: URI.open("https://fakebook-app-seeds.s3.us-west-1.amazonaws.com/comment-photos/comment-photo-25.png"), filename: "comment-photo-25.png")

comment26 = add_comment(user3.id, post21.id, "Where can I buy these?", "2022-09-10 17:10:43 UTC")

comment27 = add_comment(user5.id, post23.id, "Can't wait to listen to it.", "2022-04-05 10:35:57 UTC")

comment28 = add_comment(user4.id, post23.id, "Thank you for sharing your journey, truly inspiring. ❤️", "2022-07-18 12:47:46 UTC")

comment29 = add_comment(user7.id, post24.id, "You're a great role model for many.", "2019-10-22 11:52:09 UTC")

comment30 = add_comment(user12.id, post22.id, "What a game! On to the next.", "2021-04-14 19:55:23 UTC")

comment31 = add_comment(user2.id, post25.id, "Absolutely! An artist's vision is unique and should remain their own. #SupportArtists", "2019-07-01 08:17:23 UTC")

comment32 = add_comment(user11.id, post25.id, "Couldn't agree more! 💯", "2019-07-01 10:26:47 UTC")

comment33 = add_comment(user4.id, post26.id, "This is a historic moment. Congratulations!", "2008-11-05 02:12:32 UTC")

comment33.photo.attach(io: URI.open("https://fakebook-app-seeds.s3.us-west-1.amazonaws.com/comment-photos/comment-photo-33.png"), filename: "comment-photo-33.png")

comment34 = add_comment(user5.id, post27.id, "Healthcare should be a right, not a privilege. Well said!", "2010-03-24 09:14:28 UTC")

comment35 = add_comment(user2.id, post27.id, "Huge step forward for the country.", "2010-03-24 11:03:46 UTC")

comment36 = add_comment(user12.id, post28.id, "Already pre-ordered. Can't wait to read it! Expect this stack to be gone by the end of the day.", "2020-09-17 12:45:16 UTC")

comment36.photo.attach(io: URI.open("https://fakebook-app-seeds.s3.us-west-1.amazonaws.com/comment-photos/comment-photo-36.png"), filename: "comment-photo-36.png")

comment37 = add_comment(user3.id, post28.id, "Looking forward to gaining some insights from your experience.", "2020-09-17 15:20:39 UTC")

comment38 = add_comment(user7.id, post29.id, "GOAT 🎾", "2020-02-02 22:51:12 UTC")

comment39 = add_comment(user8.id, post30.id, "Mental health is so crucial. Thanks for speaking out.", "2021-05-12 13:14:33 UTC")

comment40 = add_comment(user6.id, post31.id, "Totally agree! Nutrition is key to success.", "2021-09-07 19:28:12 UTC")

comment41 = add_comment(user10.id, post32.id, "Congratulations! You've made your fans proud again!", "2019-07-14 17:30:47 UTC")

comment42 = add_comment(user5.id, post32.id, "Wow! Wimbledon #5! The first one feels like it was just yesterday...", "2019-07-14 17:32:09 UTC")

comment42.photo.attach(io: URI.open("https://fakebook-app-seeds.s3.us-west-1.amazonaws.com/comment-photos/comment-photo-42.png"), filename: "comment-photo-42.png")

comment43 = add_comment(user2.id, post33.id, "That's great! Every little bit helps.", "2020-03-27 14:21:19 UTC")

comment44 = add_comment(user9.id, post34.id, "Juventus just got a superstar! ⚽", "2018-07-10 15:19:20 UTC")

comment45 = add_comment(user12.id, post35.id, "Unstoppable indeed! Keep shining ⭐", "2021-08-17 10:46:31 UTC")

comment46 = add_comment(user3.id, post38.id, "Can't wait to try the new makeup line! Will try to recreate this look.", "2017-06-21 15:32:41 UTC")

comment46.photo.attach(io: URI.open("https://fakebook-app-seeds.s3.us-west-1.amazonaws.com/comment-photos/comment-photo-46.png"), filename: "comment-photo-46.png")

comment47 = add_comment(user2.id, post39.id, "Thank you for advocating for justice.", "2019-06-13 20:41:16 UTC")

comment48 = add_comment(user13.id, post39.id, "Must've just missed you!", "2019-06-13 20:43:11 UTC")

comment49 = add_comment(user6.id, post41.id, "You were fantastic in the movie!", "2018-03-02 17:47:36 UTC")

comment50 = add_comment(user6.id, post42.id, "More power to women in every field! 👏", "2020-01-25 11:20:19 UTC")

comment50.photo.attach(io: URI.open("https://fakebook-app-seeds.s3.us-west-1.amazonaws.com/comment-photos/comment-photo-50.png"), filename: "comment-photo-50.png")

comment51 = add_comment(user5.id, post43.id, "We need to protect Mother Earth. 🌎", "2021-04-22 14:12:03 UTC")

comment52 = add_comment(user4.id, post43.id, "I should start recycling...", "2021-04-22 14:36:44 UTC")

comment53 = add_comment(user8.id, post44.id, "Innovation at its finest!", "2017-07-29 16:53:01 UTC")

comment54 = add_comment(user4.id, post44.id, "Such a polished interior.", "2017-07-29 18:32:04 UTC")

comment54.photo.attach(io: URI.open("https://fakebook-app-seeds.s3.us-west-1.amazonaws.com/comment-photos/comment-photo-54.png"), filename: "comment-photo-54.png")

comment55 = add_comment(user11.id, post45.id, "This is out of this world! Literally!", "2018-02-06 20:41:19 UTC")

comment56 = add_comment(user12.id, post46.id, "This is the future!", "2020-08-29 18:02:11 UTC")

comment57 = add_comment(user2.id, post46.id, "Can't tell if this technology is scary or cool.", "2020-08-30 20:15:09 UTC")

comment58 = add_comment(user6.id, post46.id, "Wow!", "2020-08-30 20:16:29 UTC")

puts "Creating sample child comments..."

def add_child_comment(user_id, post_id, parent_comment_id, body, created_at)
    comment = Comment.create!({
        commenter_id: user_id,
        post_id: post_id,
        body: body,
        parent_comment_id: parent_comment_id
    })

    comment.created_at = created_at
    comment.save!
    
    return comment
end

comment59 = add_child_comment(user8.id, post6.id, comment5.id, "Couldn't agree more! They're perfect for each other.", "2018-07-10 19:05:47 UTC")

comment60 = add_child_comment(user7.id, post6.id, comment6.id, "Haha, me too! Save me a dance.", "2018-07-10 19:10:12 UTC")

comment61 = add_child_comment(user1.id, post8.id, comment9.id, "That's an amazing shot, thanks for sharing!", "2019-07-13 20:00:30 UTC")

comment62 = add_child_comment(user10.id, post10.id, comment11.id, "Family truly is a blessing.", "2022-06-05 17:30:54 UTC")

comment63 = add_child_comment(user13.id, post11.id, comment12.id, "The speed was just insane!", "2021-03-28 19:00:49 UTC")

comment64 = add_child_comment(user9.id, post16.id, comment19.id, "That scene was powerful, left me speechless.", "2017-05-14 19:25:21 UTC")

comment65 = add_child_comment(user12.id, post17.id, comment21.id, "100%! That outfit was a showstopper.", "2019-02-20 14:00:36 UTC")

comment66 = add_child_comment(user11.id, post21.id, comment26.id, "I heard they're dropping next month!", "2022-09-10 17:15:09 UTC")

comment67 = add_child_comment(user13.id, post23.id, comment27.id, "Me too! Always a treat to hear new music.", "2022-04-05 10:40:13 UTC")

comment68 = add_child_comment(user10.id, post25.id, comment31.id, "This is so true. The art belongs to the artist.", "2019-07-01 11:00:51 UTC")

comment69 = add_child_comment(user6.id, post28.id, comment36.id, "Just placed my order too! Can't wait!", "2020-09-17 13:00:27 UTC")

comment70 = add_child_comment(user5.id, post30.id, comment39.id, "It's refreshing to see celebrities talk openly about this.", "2021-05-12 13:30:46 UTC")

comment71 = add_child_comment(user2.id, post32.id, comment41.id, "You always make it look so easy.", "2019-07-14 17:45:35 UTC")

comment72 = add_child_comment(user3.id, post34.id, comment44.id, "A match made in heaven!", "2018-07-10 15:30:24 UTC")

comment73 = add_child_comment(user4.id, post35.id, comment46.id, "Wow, your dog is absolutely adorable!", "2018-11-12 12:15:38 UTC")

comment74 = add_child_comment(user9.id, post37.id, comment48.id, "That book was life-changing for me.", "2017-06-15 22:00:57 UTC")

comment75 = add_child_comment(user8.id, post40.id, comment50.id, "The second episode is even better!", "2020-11-05 10:20:31 UTC")

comment76 = add_child_comment(user8.id, post42.id, comment52.id, "Wish I was there, looks like a lot of fun!", "2018-05-14 17:40:09 UTC")

comment77 = add_child_comment(user7.id, post45.id, comment55.id, "The photography is just stunning.", "2019-12-13 21:00:44 UTC")

comment78 = add_child_comment(user1.id, post28.id, comment36.id, "Definitely adding this to my reading list.", "2020-09-17 13:24:21 UTC")

comment79 = add_child_comment(user1.id, post2.id, comment1.id, "Thank you!", "2023-08-24 09:39:23 UTC")

comment80 = add_child_comment(user10.id, post18.id, comment22.id, "The game was so close, can't believe they won!", "2018-06-11 UTC")

comment81 = add_child_comment(user9.id, post23.id, comment27.id, "My favorite album by far.", "2022-04-05 21:31:09 UTC")

comment82 = add_child_comment(user12.id, post21.id, comment25.id, "Where did you get those shoes? I need them!", "2022-09-10 17:13:20 UTC")

comment83 = add_child_comment(user11.id, post41.id, comment49.id, "I totally agree, the plot twist was unexpected.", "2018-03-03 18:32:01 UTC")

comment84 = add_child_comment(user6.id, post41.id, comment49.id, "The choreography was amazing!", "2018-03-03 19:57:16 UTC")

comment85 = add_child_comment(user11.id, post39.id, comment47.id, "Just doing my part.", "2019-06-15 20:11:26 UTC")

comment86 = add_child_comment(user9.id, post32.id, comment42.id, "Time really flies when you're winning grand slams...", "2019-07-14 17:55:04 UTC")

comment87 = add_child_comment(user12.id, post43.id, comment52.id, "We all should!", "2021-04-24 08:30:19 UTC")

puts "Creating sample friendships..."

user_ids = (1..13).to_a

unique_pairs = Set.new
friendship_count = {}

user_ids.each { |id| friendship_count[id] = 0 }

while true
    exhausted_users = friendship_count.select { |k, v| v >= 8 }.keys
    available_users = user_ids - exhausted_users
    
    break if (friendship_count.values.all? { |count| count >= 5 }) || available_users.empty?

    user1_id, user2_id = available_users.sample(2)
    next if user1_id.nil? || user2_id.nil? || user1_id == user2_id
    
    next if unique_pairs.include?([user1_id, user2_id]) || unique_pairs.include?([user2_id, user1_id])

    friendship = Friendship.new(user_id: user1_id, friend_id: user2_id, status: 'accepted')
    
    if friendship.save
        unique_pairs.add([user1_id, user2_id])

        friendship_count[user1_id] += 1
        friendship_count[user2_id] += 1
    end
end

puts "Done!"
