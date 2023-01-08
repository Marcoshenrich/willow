class CreateFavorites < ActiveRecord::Migration[7.0]
  def change
    create_table :favorites do |t|
      t.references :user, foreign_key: true, index: false
      t.references :listing, foreign_key: true
      t.index [:user_id, :listing_id], unique: true
      t.timestamps
    end
  end
end
