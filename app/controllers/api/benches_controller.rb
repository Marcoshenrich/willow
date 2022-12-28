class Api::BenchesController < ApplicationController
    def index
        @benches = Bench.all
        # debugger
        render "api/benches/index"
    end

    def create
        @bench = Bench.new(bench_params)
        if @bench.save!
            render "api/benches/show"
        else
            render json: { errors: @bench.errors.full_messages }, status: :unprocessable_entity 
        end
    end

    def show
        @bench = Bench.find_by(id: params[:id])
         if @bench
            render "api/benches/show"
        else
            render json: { errors: @bench.errors.full_messages }, status: 403
        end
    end

    private
    def bench_params
        params.require(:bench).permit(:title, :description, :price, :seating, :lat, :lng)
    end
end
