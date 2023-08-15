class Api::PostsController < ApplicationController
    before_action :set_post, only: [:show, :edit, :update, :destroy]
    before_action :ensure_author, only: [:edit, :update, :destroy]

    def index
        @posts = Post.all
        render 'api/posts/index'
    end

    def show
        render 'api/posts/show'
    end

    def new
        @post = Post.new
    end

    def create
        @post = Post.new(post_params)
        @post.author_id = current_user.id

        if @post.save
            redirect_to @post, notice: 'Post was successfully created.'
        else
            render :new
        end
    end

    def edit
    end

    def update
        if @post.update(post_params)
            redirect_to @post, notice: 'Post was successfully updated.'
        else
            render :edit
        end
    end

    def destroy
        @post.destroy
        redirect_to posts_url, notice: 'Post was successfully deleted.'
    end

    private

    def set_post
        @post = Post.find(params[:id])
    end

    def ensure_author
        unless @post.author_id == current_user.id
            redirect_to posts_url, alert: "You don't have permission to perform this action."
        end
    end

    def post_params
        params.require(:post).permit(:body, :author_id)
    end
end