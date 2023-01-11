class Review < ApplicationRecord
    validates :user_id, :listing_id, :body, presence: true
    validates :body, length: { in: 1...1000 }

    belongs_to :user
    belongs_to :listing

    has_many :user_appointments,
      through: :user,
      source: :user_appointments

    def self.listing_reviews(listing_id)
      Review
        .select("*")
        .where("listing_id IN (?)", listing_id)
    end
end
