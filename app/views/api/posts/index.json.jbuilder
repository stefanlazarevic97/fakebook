@posts.each do |post|
    json.set! post.id.to_s do
        json.partial! '/api/posts/post', post: post, current_user: @current_user
    end
end
