class Api::PostsController < ApplicationController
    wrap_parameters include: Post.attribute_names + ['authorId']
    
    before_action :set_post, only: [:show, :update, :destroy]
    before_action :ensure_author, only: [:update, :destroy]

    def index
        @posts = Post.where(author_id: current_user.id)
        render 'api/posts/index'
    end

    def show
        render 'api/posts/show'
    end

    def create
        @post = Post.new(post_params)

        if @post.save
            render 'api/posts/show', status: :created
        else
            render json: @post.errors.full_messages, status: :unprocessable_entity
        end
    end

    def update
        if @post.update(post_params)
            render 'api/posts/show', notice: 'Post was successfully updated.'
        else
            render json: @post.errors.full_messages, status: :unprocessable_entity
        end
    end

    def destroy
        @post.destroy
        head :no_content, notice: 'Post was successfully deleted.'
    end

    private

    def set_post
        @post = Post.find(params[:id])
    end

    def ensure_author
        unless @post.author_id == current_user.id
            render json: { error: "You don't have permission to perform this action." }, status: :forbidden
        end
    end

    def post_params
        params.require(:post).permit(:body, :author_id)
    end
end