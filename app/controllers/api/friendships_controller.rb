class Api::FriendshipsController < ApplicationController
    wrap_parameters include: Friendship.attribute_names + ['friendId']

    before_action :require_logged_in, only: [:create, :update, :destroy]

    def create
        @friendship = Friendship.new(friendship_params)
        @friendship.user_id = current_user.id

        if @friendship.save
            render 'api/friendships/show'
        else
            render json: @friendship.errors.full_messages, status: 422
        end
    end

    def destroy
        @friendship = Friendship.where(user_id: current_user.id, friend_id: params[:id]).first

        unless @friendship && @friendship.user_id == current_user.id
            return render json: { errors: ["Unauthorized action."] }, status: 403
        end

        if @friendship.destroy
            render json: @friendship.id
        else
            render json: { errors: ["Failed to delete friendship."] }, status: 422
        end
    end

    def update
        @friendship = Friendship.find_by(id: params[:id])

        unless @friendship && (@friendship.user_id == current_user.id || @friendship.friend_id == current_user.id)
            return render json: { errors: ["Unauthorized action."] }, status: 403
        end

        if @friendship.update(friendship_params)
            render 'api/friendships/show'
        else
            render json: @friendship.errors.full_messages, status: 422
        end
    end

    private 

    def friendship_params
        params.require(:friendship).permit(:friend_id, :status)
    end
end
