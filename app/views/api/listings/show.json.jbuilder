json.listing do
  json.extract! @listing, :id, :name, :available, :street_num, :street_name, :city, :state, :zip, :value, :beds, :posting_date, :description, :built, :agent_id, :lat, :long, :created_at, :updated_at
end