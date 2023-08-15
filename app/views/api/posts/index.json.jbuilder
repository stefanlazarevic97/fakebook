@posts.each do |post|
    json.set! post.id.to_s do
        json.extract! post, 
            :id, 
            :author_id,
            :body, 
            :created_at, 
            :updated_at

        json.author "#{post.author.first_name} #{post.author.last_name}"
    end
end