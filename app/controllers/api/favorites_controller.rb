class Api::FavoritesController < ApplicationController

    def create 
        @favorite = Favorite.new(favorite_params)
        if @favorite.save
            render "api/favorites/show"
        end
    end
    
    def index
        @favorites = Favorite.all
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
