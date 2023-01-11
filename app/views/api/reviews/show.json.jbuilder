json.review do
  json.extract! @review, :id, :user_id, :listing_id, :body
    json.set! :user do
      json.extract! @review.user.appointments, :date
  end
end 