class CreateListings < ActiveRecord::Migration[7.0]
  def change
    create_table :listings do |t|
      t.string :name, null: false
      t.boolean :available, null: false
      t.string :street_num, null: false
      t.string :street_name, null: false
      t.string :city, null: false
      t.string :zip, limit: 5, null: false
      t.integer :value, null: false
      t.integer :beds, null: false
      t.date :posting_date, null: false
      t.text :description, limit: 2500, null: false
      t.integer :built, null: false
      t.references :agent, foreign_key: {to_table: :users}, null: false
      t.float :lat, null: false
      t.float :long, null: false
      t.timestamps
    end
  end
end
