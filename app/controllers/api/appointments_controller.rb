class Api::AppointmentsController < ApplicationController
    def create
        @appointment = Appointment.new(appointment_params)
        @appointment.user_id = current_user.id

        if @appointment.save
            render "api/appointments/show"
        else
            render json: { errors: @appointment.errors.full_messages }, status: :unprocessable_entity 
        end
    end

    def show
        @appointments = Appointment.availability_by_agent_date(params[:appointment][:date], params[:appointment][:agent_id])
        render "api/appointments/index"
    end


    def index
        @appointments = Appointment.all
        puts ""
        puts "in apps controller"
        puts ""
        render "api/appointments/index"
    end


    def destroy
        @appointment = Appointment.find_by_id(params[:id])
        @appointment.destroy
        head :no_content
    end


    private
    def appointment_params
        params.require(:appointment).permit(:agent_id, :listing_id, :date, :time)
    end
end
