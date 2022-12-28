# json.benches do #makes a new key (any value) that is the top level key that the frontend sees
    @benches.each do |bench|
        json.set! bench.id do
            json.extract! bench, :title, :description, :price, :seating, :lat, :lng, :created_at, :updated_at
        end
    end
# end