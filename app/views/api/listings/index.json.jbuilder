# json.benches do #makes a new key (any value) that is the top level key that the frontend sees
    # @benches.each do |bench|
    #     json.set! bench.id do
    #         json.extract! bench, :title, :description, :price, :seating, :lat, :lng, :created_at
    #     end
    # end


    @listings.each do |listing|

        json.set! listing.id do
            json.extract! listing, :id, :name, :available, :street_num, :street_name, :city, :state, :zip, :posting_date, :description, :built, :agent_id, :lat, :long, :created_at, :updated_at,:outdoors,:flowers,:mushrooms,:blessings,:omens,:sqin,:num_rooms,:beds,:num_fireplaces,:fairy_dust ,:human_teeth,:stolen_dreams
            json.imageUrls listing.images.map { |file| url_for(file) }
        end
        
    end
# end