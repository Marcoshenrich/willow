class Favorite < ApplicationRecord
    validates :user_id, uniqueness: { scope: :listing_id}, presence: true
    validates :listing_id, presence: true

    belongs_to :user
    belongs_to :listing
end
