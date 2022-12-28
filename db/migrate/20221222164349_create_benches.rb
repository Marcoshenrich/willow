class CreateBenches < ActiveRecord::Migration[7.0]
  def change
    create_table :benches do |t|
      t.string :title, null: false
      t.text :description, null: false
      t.integer :price, null: false
      t.integer :seating, null: false, default: 2
      t.float :lat, null: false
      t.float :lng, null: false
      t.timestamps
    end
  end
end
