class Api::UsersController < ApplicationController
    wrap_parameters include: User.attribute_names + 
    ['password'] + 
    ['passwordConfirmation'] + 
    ['firstName'] +
    ['lastName']

    before_action :set_user, only: [:show, :update, :destroy]

    def create
        @user = User.new(user_params)
        @current_user = current_user
        
        if @user.save
            login(@user)
            render 'api/users/show'
        else 
            render json: { errors: @user.errors.full_messages }, status: :unprocessable_entity
        end
    end

    def show
        @current_user = current_user
        render 'api/users/show'
    end

    def update
        @current_user = current_user

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

    def search
        @users = User.search(params[:query])
        @current_user = current_user
        render 'api/users/search'
    end

    private

    def set_user
        @user = User.find_by(id: params[:id])
    end

    def user_params
        params.require(:user).permit(:first_name, :last_name, :bio, :email, :phone, :profile_picture, :cover_photo, :password, :password_confirmation)
    end
end
