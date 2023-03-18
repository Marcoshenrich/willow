json.stats do
  json.extract! @stats, :num_future_appointments, :num_past_appointments, :num_reviews, :num_favorites
end