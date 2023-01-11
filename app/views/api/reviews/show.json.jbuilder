json.review do
  json.extract! @review, :id, :user_id, :listing_id, :body
      json.set! :user do
        json.extract! @review.user, :username
      end
      json.set! :user_appointments do
          json.array! @review.user_appointments, :date
      end
end 