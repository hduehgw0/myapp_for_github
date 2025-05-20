class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable,
         :jwt_authenticatable,                             # ✅ JWT対応
         jwt_revocation_strategy: JwtDenylist              # ✅ トークンの失効戦略をDenylistに変更
end
