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
        @appointment = Appointment.find_by_id(params[:id])
        render "api/appointments/show"
    end


    def index
        @appointments = Appointment.all
        render "api/appointments/index"
    end


    def destroy
        @appointment = Appointment.find_by_id(params[:id])
        @appointment.destroy
        head :no_content
    end


    private
    def appointment_params
        params.require(:appointment).permit(:agent_id, :listing_id, :date_time)
    end
end
