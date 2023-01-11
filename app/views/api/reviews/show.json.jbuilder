json.review do
  json.extract! @review, :id, :user_id, :listing_id, :body
    #   json.set! :user_appointments do
    #     json.extract! @review.user_appointments, :date
    # end
end 