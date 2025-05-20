class Users::RegistrationsController < Devise::RegistrationsController
  respond_to :json

  private

  # ユーザー登録後のレスポンスをカスタマイズ
  def respond_with(resource, _opts = {})
    if resource.persisted?
      render json: {
        status: { code: 200, message: 'Signed up successfully.' },
        data: resource
      }, status: :ok
    else
      render json: {
        status: { code: 422, message: 'User could not be created.' },
        errors: resource.errors.full_messages
      }, status: :unprocessable_entity
    end
  end
end
