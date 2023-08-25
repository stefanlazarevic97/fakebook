class Api::ReactionsController < ApplicationController
    wrap_parameters include: Reaction.attribute_names + ['reactorId', 'reactionType', 'reactableType', 'reactableId']

    before_action :set_current_user, only: [:index, :create, :update, :destroy]

    def index
        if params[:reactor_id]
            @reactions = Reaction.where(reactor_id: params[:reactor_id])
        elsif params[:reactable_type] && params[:reactable_id]
            @reactions = Reaction.where(reactable_type: params[:reactable_type], reactable_id: params[:reactable_id])
        else
            @reactions = current_user.reactions
        end
        
        render 'api/reactions/index'
    end

    def create
        @reaction = Reaction.new(reaction_params)
        @reactable = @reaction.reactable

        if @reaction.save!
            if @reactable.is_a?(Comment)
                @comment = @reactable
                render 'api/comments/show'
            elsif @reactable.is_a?(Post)
                @post = @reactable
                render 'api/posts/show'
            end
        else
            render json: @reaction.errors.full_messages, status: 422
        end
    end

    def update
        @reaction = Reaction.find_by(id: params[:id], reactor: current_user)
        @reactable = @reaction.reactable

        if @reaction
            if @reaction.update!(reaction_params)
                if @reactable.is_a?(Comment)
                    @comment = @reactable
                    render 'api/comments/show'
                elsif @reactable.is_a?(Post)
                    @post = @reactable
                    render 'api/posts/show'
                end
            else
                render json: @reaction.errors.full_messages, status: 422
            end
        else
            render json: { error: "Reaction not found" }, status: 404
        end
    end

    def destroy
        @reaction = Reaction.find_by(id: params[:id])
        @reactable = @reaction.reactable

        if @reaction&.destroy
            if @reactable.is_a?(Comment)
                @comment = @reactable
                render 'api/comments/show'
            elsif @reactable.is_a?(Post)
                @post = @reactable
                render 'api/posts/show'
            end
        else
            render json: { error: "Reaction not found" }, status: 404
        end
    end

    private

    def set_current_user
        @current_user = current_user
    end

    def reaction_params
        params.require(:reaction).permit(:reactable_id, :reactor_id, :reactable_type, :reaction_type)
    end
end
