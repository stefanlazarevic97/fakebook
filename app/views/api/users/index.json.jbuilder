@users.each do |user|
    json.set! user.id do
        json.id user.id
        json.profile_picture_url user.profile_picture.attached? ? url_for(user.profile_picture) : nil
        json.first_name user.first_name
        json.last_name user.last_name
        json.mutual_friends_count @current_user ? @current_user.mutual_friends(user) : nil
    end
end
