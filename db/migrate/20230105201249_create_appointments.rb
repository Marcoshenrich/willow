class CreateAppointments < ActiveRecord::Migration[7.0]
  def change
    create_table :appointments do |t|
      t.date :date, null:false
      t.string :time, null:false
      t.references :agent, foreign_key: {to_table: :users}, null: false, index: false
      t.references :user, foreign_key: true, null: false, index: false
      t.references :listing, foreign_key: true, null: false, index: false
      t.index [:agent_id, :date, :time], unique: true
      t.index [:user_id, :date, :time], unique: true
      t.index [:listing_id, :date, :time], unique: true
      t.timestamps
    end
  end
end
