Rails.application.routes.draw do
  # ✅ Deviseのルート（API仕様、json固定）
  devise_for :users,
             defaults: { format: :json }, # ← これが追加ポイント
             path: '',
             path_names: {
               sign_in: 'login',       # POST /login
               sign_out: 'logout',     # DELETE /logout
               registration: 'signup'  # POST /signup
             }

  # ✅ POST一覧API（保護されたルート）
  resources :posts

  # ✅ アプリのヘルスチェック用（開発用）
  get "up" => "rails/health#show", as: :rails_health_check

  # rootルートはAPI専用アプリでは不要（またはJSON返却専用にしてもOK）
  # root "posts#index"
end
