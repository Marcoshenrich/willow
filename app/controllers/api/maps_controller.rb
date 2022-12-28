class Api::MapsController < ApplicationController
    def show
        render json: {key: Rails.application.credentials.google[:api_key]}
    end
end
