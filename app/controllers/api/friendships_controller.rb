class Api::FriendshipsController < ApplicationController
    def create
        @friendship = Friendship.new(friendship_params)
        @friendship.user_id = current_user.id
        
        if @friendship.save
            render :show
        else
            render json: @friendship.errors.full_messages, status: 422
        end
    end

    def destroy
        @friendship = Friendship.find_by(id: params[:id])

        unless @friendship.user_id == current_user.id
            return render json: { errors: ["Unauthorized action."] }, status: 403
        end

        if @friendship.destroy
            render json: {}
        else
            render json: { errors: ["Failed to delete friendship."] }, status: 422
        end
    end

    def index
        user = User.find_by(id: params[:user_id])
        
        if user
            @friendships = user.friendships
            render :index
        else
            render json: { errors: ["User not found."] }, status: 404
        end
    end

    private 

    def friendship_params
        params.require(:friendship).permit(:friend_id, :status)
    end
end
