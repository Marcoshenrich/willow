class Api::FavoritesController < ApplicationController
    wrap_parameters include: Favorite.attribute_names + ['listingId', 'userId']

    def create 
        @favorite = Favorite.new(favorite_params)
        if @favorite.save
            render "api/favorites/show"
        end
    end
    
    def index
        @favorites = Favorite.user_favorites(current_user.id)
        render "api/favorites/index"
    end
    
    def destroy
        @favorite = Favorite.find_by_id(params[:id])
        @favorite.destroy
        head :no_content
    end

    def favorite_params
        params.require(:favorite).permit(:user_id, :listing_id)
    end
end
