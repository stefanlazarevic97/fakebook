class Api::FriendshipsController < ApplicationController
    wrap_parameters include: Friendship.attribute_names + ['friendId']

    before_action :require_logged_in, only: [:create, :update, :destroy]

    def create
        @friendship = Friendship.new(friendship_params)
        @friendship.user_id = current_user.id
        @reverse_friendship = Friendship.new(friend_id: @friendship.user_id, user_id: @friendship.friend_id)

        @user = User.find_by(id: @friendship.friend_id)

        if @friendship.save && @reverse_friendship.save
            render 'api/friendships/show'
        else
            render json: @friendship.errors.full_messages, status: 422
        end
    end

    def destroy
        @friendship = Friendship.where(user_id: params[:id], friend_id: current_user.id).first
        @reverse_friendship = Friendship.where(friend_id: params[:id], user_id: current_user.id).first

        unless @friendship.user_id == current_user.id || @reverse_friendship.user_id == current_user.id
            return render json: { errors: ["Unauthorized action."] }, status: 403
        end

        if @friendship.destroy && @reverse_friendship.destroy
            render json: [@friendship.id, @reverse_friendship.id]
        else
            render json: { errors: ["Failed to delete friendship."] }, status: 422
        end
    end

    def update
        @friendship = Friendship.find_by(id: params[:id])
        @reverse_friendship = Friendship.find_by(friend_id: @friendship.user_id)

        if @friendship.update(friendship_params) && @reverse_friendship.update(friendship_params)
            render 'api/friendships/show'
        else
            render json: @friendship.errors.full_messages, status: 422
        end
    end

    # def index
    #     user = User.find_by(id: params[:user_id])
        
    #     if user
    #         @friendships = user.friendships
    #         render :index
    #     else
    #         render json: { errors: ["User not found."] }, status: 404
    #     end
    # end

    private 

    def friendship_params
        params.require(:friendship).permit(:friend_id, :status)
    end
end
