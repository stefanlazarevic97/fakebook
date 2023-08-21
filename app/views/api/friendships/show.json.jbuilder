json.extract! @friendship, :id, :user_id, :friend_id, :status
json.mutual_friends_count @friendship.user.mutual_friends(@friendship.friend)