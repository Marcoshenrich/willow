
    @listings.each do |listing|
        json.set! listing.id do
            json.extract! listing, :id, :name, :available, :street_num, :street_name, :city, :state, :zip, :posting_date, :description, :built, :agent_id, :lat, :long, :created_at, :updated_at,:outdoors,:flowers,:mushrooms,:blessings,:omens,:sqin,:num_rooms,:beds,:num_fireplaces,:fairy_dust ,:human_teeth,:stolen_dreams
            json.imageUrls listing.images.map { |file| file.url }
        end
    end