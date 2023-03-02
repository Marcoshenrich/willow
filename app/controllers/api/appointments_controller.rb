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

    def future_user_appointments
        @appointments = Appointment.future_user_appointments(params[:user_id])
        render "api/appointments/index"
    end

    def index
        @appointments = current_user.user_appointments
        render "api/appointments/index"
    end

    def update
        @appointment = Appointment.find_by(id: params[:id])
        if @appointment.update(appointment_params)
            render "api/appointments/show"
        end
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
