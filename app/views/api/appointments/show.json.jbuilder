json.appointment do
  json.extract! @appointment, :id, :agent_id, :user_id, :listing_id, :date, :time
  json.set! :listing do
    json.extract! @appointment.listing, :name
    json.imageUrls @appointment.listing.images.map { |file| file.url }
  end
  json.set! :agent do
      json.extract! @appointment.agent, :username
  end
end 