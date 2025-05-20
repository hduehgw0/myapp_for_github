class Users::SessionsController < Devise::SessionsController
  respond_to :json

  private

  # ログイン成功時のレスポンス
  def respond_with(resource, _opts = {})
    render json: {
      status: { code: 200, message: 'Logged in successfully.' },
      data: resource
    }, status: :ok
  end

  # ログアウト時のレスポンス
  def respond_to_on_destroy
    render json: {
      status: { code: 200, message: 'Logged out successfully.' }
    }, status: :ok
  end
end
