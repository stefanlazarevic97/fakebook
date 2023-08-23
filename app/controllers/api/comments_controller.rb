class Api::CommentsController < ApplicationController
    wrap_parameters include: Comment.attribute_names + ['commenterId', 'postId', 'parentCommentId']
    
    def index
        @post = Post.find[params[:post_id]]
        
        if @post
            @comments = @post.comments.includes(:commenter).order("comments.created_at DESC").page(params[:page]).per(3)
            render 'api/comments/index'
        else 
            render json: @post.errors.full_messages, status: 404
        end
    end

    def create 
        @comment = Comment.new(comment_params)
        @comment.commenter_id = current_user.id
        @comment.post_id = params[:post_id]
        @comment.parent_comment_id = params[:parent_comment_id]
        Rails.logger.info "Comment before save: #{@comment.inspect}"

        if @comment.save
            @post = Post.find(@comment.post_id)
            render 'api/comments/show'
        else 
            render json: @comment.errors.full_messages, status: 422
        end
    end

    def update 
        @comment = Comment.find(params[:id])

        if @comment.update(comment_params)
            render 'api/comments/show'
        else 
            render json: @comment.errors.full_messages, status: 422
        end

    end

    def destroy
        @comment = Comment.find(params[:id])
        
        if @comment.destroy
            render json: { id: params[:id] }
        else 
            render json: @comment.errors.full_messages, status: 422
        end
    end

    # def all_comments 
    #     @comments = Comment.includes(:commenter, :post)
    #     render 'api/comments/all_comments'
    # end

    private 

    def comment_params
        params.require(:comment).permit(:body, :commenter_id, :post_id, :parent_comment_id, :photo)
    end 
end
