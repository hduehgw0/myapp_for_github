json.extract! post, :id, :title, :body, :published, :created_at, :updated_at
json.imageUrl url_for(post.image) if post.image.attached?  # ✅ 画像があるときだけURLを返す
