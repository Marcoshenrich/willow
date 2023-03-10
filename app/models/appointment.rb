require 'date'

# == Schema Information
#
# Table name: appointments
#
#  id         :bigint           not null, primary key
#  date_time  :datetime         not null
#  agent_id   :bigint           not null
#  user_id    :bigint           not null
#  listing_id :bigint           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class Appointment < ApplicationRecord
  validates :listing_id, :user_id, :agent_id, uniqueness: { scope: [:date, :time]}, presence: true

    belongs_to :listing

    belongs_to :user,
        foreign_key: :user_id,
        class_name: :User

    belongs_to :agent,
        foreign_key: :agent_id,
        class_name: :User

    def self.availability_by_agent_date(date, agent_id)
      Appointment
      .select("*")
      .where("date IN (?)", date)
      .where("agent_id IN (?)", agent_id)
    end

    def self.future_user_appointments(user_id)
      Appointment
      .select("*")
      .where("user_id IN (?)", user_id)
      .where("date >= (?)", Date.today)
    end

end
