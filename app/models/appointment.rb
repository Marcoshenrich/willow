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
  validates :date_time, uniqueness: { scope: :agent_id }
  validates :date_time, uniqueness: { scope: :user_id }
  validates :date_time, uniqueness: { scope: :listing_id }

    belongs_to :listing

    belongs_to :user,
        foreign_key: :user_id,
        class_name: :User

    belongs_to :agent,
        foreign_key: :agent_id,
        class_name: :User

end
