json.array! @friendships do |friendship|
    json.id friendship.id
    json.status friendship.status
    
    json.friend do
        json.id friendship.friend.id
        json.firstName friendship.friend.first_name
        json.lastName friendship.friend.last_name
        json.profilePictureUrl url_for(friendship.friend.profile_picture) if friendship.friend.profile_picture.attached?
    end
end