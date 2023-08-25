@comments.each do |comment|
    json.set! comment.id do
        json.partial! '/api/comments/comment', comment: comment, current_user: @current_user
    end
end
