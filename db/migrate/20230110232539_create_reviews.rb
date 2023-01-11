class CreateReviews < ActiveRecord::Migration[7.0]
  def change
    create_table :reviews do |t|
      t.references :user, foreign_key: true
      t.references :listing, foreign_key: true
      t.text :body, null: false
      t.timestamps
    end
  end
end
