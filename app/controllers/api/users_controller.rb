class Api::UsersController < ApplicationController
    wrap_parameters include: User.attribute_names + 
    ['password'] + 
    ['passwordConfirmation'] + 
    ['firstName'] +
    ['lastName']

    before_action :set_user, only: [:show, :update, :destroy]

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
        render 'api/users/profile'
    end

    def update
        if @user.update(user_params)
            render 'api/users/show'
        else
            render json: { errors: @user.errors.full_messages }, status: :unprocessable_entity
        end
    end

    def destroy
        @user.destroy
        head :no_content, notice: 'User was successfully deleted.'
    end

    private

    def set_user
        @user = User.find_by(id: params[:id])
    end

    def user_params
        params.require(:user).permit(:first_name, :last_name, :bio, :email, :phone, :profile_picture, :cover_photo, :password, :password_confirmation)
    end
end
