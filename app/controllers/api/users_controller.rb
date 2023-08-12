class Api::UsersController < ApplicationController
    wrap_parameters include: User.attribute_names + ['password']

    def create
        @user = User.new(user_params)
        
        if @user.save
            login(@user)
            render 'api/users/show'
        else 
            render json: { errors: @user.errors.full_messages }, status: :unprocessable_entity
        end
    end

    def show
    end

    def update
    end

    def destroy
    end

    private

    def user_params
        params.require(:user).permit(:first_name, :last_name, :bio, :email, :phone, :password)
    end
end
