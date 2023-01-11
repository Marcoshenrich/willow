class Api::ReviewsController < ApplicationController
    wrap_parameters include: Review.attribute_names + ['listingId', 'userId', 'body']

    def create
        @review = Review.new(review_params)
        if @review.save
            render "api/reviews/show"
        end
    end

    def index
        @reviews = Reviews.listing_favorites(listing.id)
        render "api/favorites/index"
    end

    def update
        @review = Review.find_by(id: params[:id])
        if @review.update(review_params)
            render "api/reviews/show"
        end
    end

    def destroy
        @review = Review.find_by(id: params[:id])
        @review.destroy
        head :no_content
    end

    def review_params
        params.require(:review).permit(:user_id, :listing_id, :body)

    end
end
