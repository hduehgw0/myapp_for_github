# app/controllers/posts_controller.rb
class PostsController < ApplicationController
  # ✅ すべてのアクションで認証（ログイン）を必須にする
  before_action :authenticate_user!

  before_action :set_post, only: [:show, :update, :destroy]

  # GET /posts
  def index
    @posts = Post.order(created_at: :desc)
    render :index
  end

  # GET /posts/:id
  def show
    render :show
  end

  # POST /posts
  def create
    @post = Post.new(post_params)
    if @post.save
      render :show, status: :created
    else
      render json: { errors: @post.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # PUT/PATCH /posts/:id
  def update
    if @post.update(post_params)
      render :show
    else
      render json: { errors: @post.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # DELETE /posts/:id
  def destroy
    @post.destroy
    head :no_content
  end

  private

  def set_post
    @post = Post.find(params[:id])
  rescue ActiveRecord::RecordNotFound
    render json: { error: "Post not found" }, status: :not_found
  end

  def post_params
    params.require(:post).permit(:title, :body, :published, :image)
  end
end
