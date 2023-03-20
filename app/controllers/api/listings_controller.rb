class Api::ListingsController < ApplicationController

    def index
        @listings = Listing.all
        render "api/listings/index"
    end

    def show
        @listing = Listing.find_by(id: params[:id])
        render "api/listings/show"
    end

    def search
        query = params[:query]
        @listings = nil
        generic_search_terms = ["homes", "home", "houses", "house", "apartments", "apartment", "rent", "buy", "rental", "rentals", "unit", "units", "fairy", "dream home", "my dream home" ]
        
        if generic_search_terms.include?(query.downcase)
            @listings = Listing.all
        else
            @listings = Listing.where('name ILIKE ? OR city ILIKE ? OR zip ILIKE ? OR flowers ILIKE ?', "%#{query}%", "%#{query}%", "%#{query}%", "%#{query}%")
        end

        if @listings.length > 0
            render "api/listings/index"
        else
            render json: ["Our search goblins can't find #{query}"], status: 422
        end
    end

    private
    def listings_params
        
    end
end
