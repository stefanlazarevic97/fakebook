@comments.each do |comment|
    json.set! comment.id do
        json.extract! comment, :id, :body, :commenter_id, :post_id, :created_at, :updated_at, :parent_comment_id
        json.commenter "#{comment.commenter.first_name} #{comment.commenter.last_name}"
        json.profile_picture_url comment.commenter.profile_picture.attached? ? url_for(comment.commenter.profile_picture) : nil
        json.photo_url comment.photo.attached? ? url_for(comment.photo) : nil
    end
end