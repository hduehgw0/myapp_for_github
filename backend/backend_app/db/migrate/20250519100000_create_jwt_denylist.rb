class CreateJwtDenylist < ActiveRecord::Migration[8.0]
  def change
    create_table :jwt_denylist do |t|
      t.string :jti, null: false     # JWTのID
      t.datetime :exp, null: false   # 有効期限
    end

    add_index :jwt_denylist, :jti   # jtiにインデックスを追加（検索高速化のため）
  end
end

