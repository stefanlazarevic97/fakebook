class Api::FriendshipsController < ApplicationController
    def create
        @friendship = Friendship.new(friendship_params)
        @friendship.user_id = current_user.id
        @reverse_friendship = Friendship.new()
        @reverse_friendship.user_id = @friendship.friend_id
        @reverse_friendship.friend_id = @friendship.user_id
        @reverse_friendship.status = @friendship.status

        if @friendship.save
            @reverse_friendship.save
            render :show
        else
            render json: @friendship.errors.full_messages, status: 422
        end
    end

    def destroy
        @friendship = Friendship.find_by(id: params[:id])
        @reverse_friendship = Friendship.find_by(user_id: @friendship.friend_id, friend_id: @friendship.user_id)
        @friendship.destroy
        @reverse_friendship.destroy
        render json: {}
    end

    def index
        @friendships = Friendship.all
        render :index
    end

    private 

    def friendship_params
        params.require(:friendship).permit(:friend_id, :status)
    end
end
