class Api::CommentsController < ApplicationController
    def index
        @post = Post.find[params[:post_id]]
        @comments = @post.comments.order("comments.created_at DESC").page(params[:page]).per(3)      
        render 'api/comments/index'
    end

    def create 
        @comment = Comment.new(comment_params)
        @comment.commenter_id = current_user.id

        if @comment.save
            render :show
        else 
            render json: @comment.errors.full_messages  
        end
    end

    def update 
        @comment = Comment.find(params[:id])

        if @comment.update(comment_params)
            render :show
        else 
            render json: @comment.errors.full_messages
        end

    end

    def show
        @comment = Comment.find(params[:id])
        render :show
    end

    def destroy
        @comment = Comment.find(params[:id])
        @comment.destroy
        render :show
    end

    def comment_params
        params.require(:comment).permit(:body, :commenter_id, :post_id, :parent_comment_id)
    end 
end
