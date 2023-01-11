# == Schema Information
#
# Table name: listings
#
#  id             :bigint           not null, primary key
#  name           :string           not null
#  available      :boolean          not null
#  street_num     :string           not null
#  street_name    :string           not null
#  city           :string           not null
#  state          :string(2)        not null
#  zip            :string(5)        not null
#  posting_date   :date             not null
#  description    :text             not null
#  built          :integer          not null
#  agent_id       :bigint           not null
#  lat            :float            not null
#  long           :float            not null
#  outdoors       :string           not null
#  flowers        :string           not null
#  mushrooms      :string           not null
#  blessings      :string           not null
#  omens          :string           not null
#  sqin           :integer          not null
#  num_rooms      :integer          not null
#  beds           :integer          not null
#  num_fireplaces :integer          not null
#  fairy_dust     :integer          not null
#  human_teeth    :integer          not null
#  stolen_dreams  :integer          not null
#  created_at     :datetime         not null
#  updated_at     :datetime         not null
#
class Listing < ApplicationRecord
    has_many_attached :images
    has_many :appointments,
        dependent: :destroy
        
  has_many :reviews,
        dependent: :destroy

    has_many :favorites,
        dependent: :destroy
end
