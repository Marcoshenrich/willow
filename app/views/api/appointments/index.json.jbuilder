@appointments.each do |appointment|
    json.set! appointment.id do
          json.extract! appointment, :id, :agent_id, :user_id, :listing_id, :date, :time
            json.set! :listing do
                json.extract! appointment.listing, :name
            end
            json.set! :agent do
                json.extract! appointment.agent, :username
            end
    end
end
