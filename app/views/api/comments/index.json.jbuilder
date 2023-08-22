@comments.each do |comment|
    json.set! comment.id do
        json.extract! comment, :id, :body, :commenter_id, :post_id, :created_at, :updated_at, :parent_comment_id
        json.first_name comment.user.first_name
        json.last_name comment.user.last_name
        json.profile_picture_url comment.user.profile_picture.attached? ? url_for(comment.user.profile_picture) : nil
    end
end