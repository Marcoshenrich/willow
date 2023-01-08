# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2023_01_08_053924) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "active_storage_attachments", force: :cascade do |t|
    t.string "name", null: false
    t.string "record_type", null: false
    t.bigint "record_id", null: false
    t.bigint "blob_id", null: false
    t.datetime "created_at", null: false
    t.index ["blob_id"], name: "index_active_storage_attachments_on_blob_id"
    t.index ["record_type", "record_id", "name", "blob_id"], name: "index_active_storage_attachments_uniqueness", unique: true
  end

  create_table "active_storage_blobs", force: :cascade do |t|
    t.string "key", null: false
    t.string "filename", null: false
    t.string "content_type"
    t.text "metadata"
    t.string "service_name", null: false
    t.bigint "byte_size", null: false
    t.string "checksum"
    t.datetime "created_at", null: false
    t.index ["key"], name: "index_active_storage_blobs_on_key", unique: true
  end

  create_table "active_storage_variant_records", force: :cascade do |t|
    t.bigint "blob_id", null: false
    t.string "variation_digest", null: false
    t.index ["blob_id", "variation_digest"], name: "index_active_storage_variant_records_uniqueness", unique: true
  end

  create_table "appointments", force: :cascade do |t|
    t.date "date", null: false
    t.string "time", null: false
    t.bigint "agent_id", null: false
    t.bigint "user_id", null: false
    t.bigint "listing_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["agent_id", "date", "time"], name: "index_appointments_on_agent_id_and_date_and_time", unique: true
    t.index ["listing_id", "date", "time"], name: "index_appointments_on_listing_id_and_date_and_time", unique: true
    t.index ["user_id", "date", "time"], name: "index_appointments_on_user_id_and_date_and_time", unique: true
  end

  create_table "favorites", force: :cascade do |t|
    t.bigint "user_id"
    t.bigint "listing_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["listing_id"], name: "index_favorites_on_listing_id"
    t.index ["user_id", "listing_id"], name: "index_favorites_on_user_id_and_listing_id", unique: true
  end

  create_table "listings", force: :cascade do |t|
    t.string "name", null: false
    t.boolean "available", null: false
    t.string "street_num", null: false
    t.string "street_name", null: false
    t.string "city", null: false
    t.string "state", limit: 2, null: false
    t.string "zip", limit: 5, null: false
    t.date "posting_date", null: false
    t.text "description", null: false
    t.integer "built", null: false
    t.bigint "agent_id", null: false
    t.float "lat", null: false
    t.float "long", null: false
    t.string "outdoors", null: false
    t.string "flowers", null: false
    t.string "mushrooms", null: false
    t.string "blessings", null: false
    t.string "omens", null: false
    t.integer "sqin", null: false
    t.integer "num_rooms", null: false
    t.integer "beds", null: false
    t.integer "num_fireplaces", null: false
    t.integer "fairy_dust", null: false
    t.integer "human_teeth", null: false
    t.integer "stolen_dreams", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["agent_id"], name: "index_listings_on_agent_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "email", null: false
    t.string "username", null: false
    t.string "password_digest", null: false
    t.string "session_token"
    t.boolean "agent", default: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["session_token"], name: "index_users_on_session_token", unique: true
    t.index ["username"], name: "index_users_on_username", unique: true
  end

  add_foreign_key "active_storage_attachments", "active_storage_blobs", column: "blob_id"
  add_foreign_key "active_storage_variant_records", "active_storage_blobs", column: "blob_id"
  add_foreign_key "appointments", "listings"
  add_foreign_key "appointments", "users"
  add_foreign_key "appointments", "users", column: "agent_id"
  add_foreign_key "favorites", "listings"
  add_foreign_key "favorites", "users"
  add_foreign_key "listings", "users", column: "agent_id"
end
