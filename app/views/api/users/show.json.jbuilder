json.user do
    json.extract! @user, 
        :id, 
        :first_name, 
        :last_name, 
        :bio, 
        :email, 
        :phone, 
        :created_at, 
        :updated_at
    json.photo_url @user.profile_picture.attached? ? url_for(@user.profile_picture) : nil
    json.cover_photo_url @user.cover_picture.attached? ? url_for(@user.cover_picture) : nil
end


