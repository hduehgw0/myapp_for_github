# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end

# db/seeds.rb

Post.create!(title: "Hello World", body: "初めての投稿です！", published: Time.now)
Post.create!(title: "テスト投稿", body: "これはシードデータです。", published: Time.now)
Post.create!(title: "下書き記事", body: "まだ公開されていません。", published: nil)
