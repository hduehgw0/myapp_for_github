json.array!(@posts) do |post|
  json.(post, :id, :title, :body, :published, :created_at, :updated_at)
end
