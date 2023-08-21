json.user do
    json.extract! @user, 
        :id, 
        :first_name, 
        :last_name, 
        :bio, 
        :email, 
        :phone, 
        :created_at, 
        :updated_at
    json.profile_picture_url @user.profile_picture.attached? ? url_for(@user.profile_picture) : nil
    json.cover_photo_url @user.cover_photo.attached? ? url_for(@user.cover_photo) : nil
    json.mutual_friends_count @current_user ? @current_user.mutual_friends(@user) : nil
end

json.friends do 
    @user.friends.each do |friend|
        json.set! friend.id do
            json.extract! friend, 
            :id, 
            :first_name, 
            :last_name
            
            json.profile_picture_url friend.profile_picture.attached? ? url_for(friend.profile_picture) : nil
            json.mutual_friends_count @current_user ? @current_user.mutual_friends(@user) : nil
        end
    end
end

json.friendships do 
    @user.friendships.each do |friendship|
        json.set! friendship.id do
            json.extract! friendship, 
                :id, 
                :user_id,
                :friend_id,
                :status
        end
    end
end

