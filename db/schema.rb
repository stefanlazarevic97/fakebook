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

ActiveRecord::Schema[7.0].define(version: 2023_08_15_035713) do
    # These are extensions that must be enabled in order to support this database
    enable_extension "plpgsql"

    create_table "posts", force: :cascade do |t|
        t.bigint "author_id", null: false
        t.text "body", null: false
        t.datetime "created_at", null: false
        t.datetime "updated_at", null: false
        t.index ["author_id"], name: "index_posts_on_author_id"
    end

    create_table "users", force: :cascade do |t|
        t.string "first_name", null: false
        t.string "last_name", null: false
        t.text "bio"
        t.string "email"
        t.string "phone"
        t.string "session_token", null: false
        t.string "password_digest", null: false
        t.datetime "created_at", null: false
        t.datetime "updated_at", null: false
        t.index ["email"], name: "index_users_on_email", unique: true
        t.index ["first_name"], name: "index_users_on_first_name"
        t.index ["last_name"], name: "index_users_on_last_name"
        t.index ["phone"], name: "index_users_on_phone", unique: true
        t.index ["session_token"], name: "index_users_on_session_token", unique: true
    end

    add_foreign_key "posts", "users", column: "author_id"
end
