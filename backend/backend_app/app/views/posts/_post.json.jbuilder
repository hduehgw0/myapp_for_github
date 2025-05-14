json.extract! post, :id, :title, :body, :published, :created_at, :updated_at

if post.image.attached?
  json.imageUrl Rails.application.routes.url_helpers.rails_blob_url(
    post.image,
    host: "localhost",
    port: 3000
  )
end
