json.extract! post, 
    :id, 
    :author_id,
    :body, 
    :created_at, 
    :updated_at

json.author "#{post.author.first_name} #{post.author.last_name}"
json.photo_url post.author.profile_picture.attached? ? url_for(post.author.profile_picture) : nil
json.imageUrls post.photos.map { |photo| url_for(photo) }
json.num_likes post.reactions.where(reaction_type: "like").length
json.num_loves post.reactions.where(reaction_type: "love").length
json.num_surpriseds post.reactions.where(reaction_type: "surprised").length
json.num_sads post.reactions.where(reaction_type: "sad").length
json.num_angrys post.reactions.where(reaction_type: "angry").length
json.num_laughs post.reactions.where(reaction_type: "laugh").length
json.reactable_type "Post"
json.current_user_reaction do
    if post.reactions.find_by(reactor_id: current_user.id)
        json.extract! post.reactions.find_by(reactor_id: current_user.id), :reaction_type, :id
    else
        nil
    end
end