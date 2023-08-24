class Api::ReactionsController < ApplicationController
    wrap_parameters include: Reaction.attribute_names + ['reactorId', 'reactionType', 'reactableType', 'reactable_id']

    def index
        @reactions = current
        render 'api/reactions/index'
    end

    def create
        reaction_attributes = reaction_params.merge(reactor_id: current_user.id)
        @reaction = Reaction.new(reaction_attributes)

        if @reaction.save
            render 'api/reactions/show'
        else
            render json: @reaction.errors.full_messages, status: 422
        end
    end

    def update
        @reaction = Reaction.find_by(id: params[:id], reactor: current_user)

        if @reaction
            if @reaction.update(reaction_params)
                render 'api/reactions/show'
            else
                render json: @reaction.errors.full_messages, status: 422
            end
        else
            render json: { error: "Reaction not found" }, status: 404
        end
    end

    def destroy
        @reaction = Reaction.find_by(id: params[:id], reactor: current_user)

        if @reaction&.destroy
            render json: { id: params[:id] }
        else
            render json: { error: "Reaction not found" }, status: 404
        end
    end

    private

    def reaction_params
        params.require(:reaction).permit(:reactable_id, :reactable_type, :reaction_type)
    end
end
