class Api::ListingsController < ApplicationController
    def create
    end

    def index
    end

    def show
        @listing = Listing.find_by(id: params[:id])
        render "api/listings/show"
    end

    private
    def listings_params
    end
end
