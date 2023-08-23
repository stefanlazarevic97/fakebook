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

    def index
        @users = User.all
        @current_user = current_user

        @users = @users.where.not(id: @current_user.id)

        if params[:search]
            search_term = "%#{params[:search]}%"
            @users = @users.where("first_name ILIKE :search OR last_name ILIKE :search", search: search_term)
        end

        render :index
    end

    private

    def set_user
        @user = User.find_by(id: params[:id])
    end

    def user_params
        params.require(:user).permit(:first_name, :last_name, :bio, :email, :phone, :profile_picture, :cover_photo, :password, :password_confirmation)
    end
end
