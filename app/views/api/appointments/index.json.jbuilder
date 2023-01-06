@appointments.each do |appointment|
    json.set! appointment.id do
        json.extract! appointment, :id, :agent_id, :user_id, :listing_id, :date_time
    end
end