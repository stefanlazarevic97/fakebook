@posts.each do |post|
    json.set! post.id.to_s do
        json.extract! post, 
            :id, 
            :author_id,
            :body, 
            :created_at, 
            :updated_at

        json.author "#{post.author.first_name} #{post.author.last_name}"
        json.photo_url post.author.profile_picture.attached? ? url_for(post.author.profile_picture) : nil
        json.imageUrls post.photos.map { |photo| url_for(photo) }
    end
end