json.favorite do
  json.extract! @favorite, :id, :user_id, :listing_id
end 