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
end

