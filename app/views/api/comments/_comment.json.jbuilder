json.extract! comment, :id, :body, :commenter_id, :post_id, :created_at, :updated_at, :parent_comment_id
json.commenter "#{comment.commenter.first_name} #{comment.commenter.last_name}"
json.profile_picture_url comment.commenter.profile_picture.attached? ? url_for(comment.commenter.profile_picture) : nil
json.photo_url comment.photo.attached? ? url_for(comment.photo) : nil
json.num_likes comment.reactions.where(reaction_type: "like").length
json.num_loves comment.reactions.where(reaction_type: "love").length
json.num_surpriseds comment.reactions.where(reaction_type: "surprised").length
json.num_sads comment.reactions.where(reaction_type: "sad").length
json.num_angrys comment.reactions.where(reaction_type: "angry").length
json.num_laughs comment.reactions.where(reaction_type: "laugh").length
json.reactable_type "Comment"
json.current_user_reaction do
    if comment.reactions.find_by(reactor_id: current_user.id)
        json.extract! comment.reactions.find_by(reactor_id: current_user.id), :reaction_type, :id
    else
        nil
    end
end