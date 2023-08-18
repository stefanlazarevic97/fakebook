json.extract! @user, 
    :id, 
    :first_name, 
    :last_name, 
    :bio, 
    :email, 
    :phone, 
    :created_at, 
    :updated_at
json.profile_picture_url @user.profile_picture.attached? ? url_for(@user.profile_picture) : nil
json.cover_photo_url @user.cover_photo.attached? ? url_for(@user.cover_photo) : nil