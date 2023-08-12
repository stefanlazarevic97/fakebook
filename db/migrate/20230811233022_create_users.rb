class CreateUsers < ActiveRecord::Migration[7.0]
    def change
        create_table :users do |t|
            t.string :first_name, null: false, index: true
            t.string :last_name, null: false, index: true
            t.text :bio
            t.string :email, index: { unique: true }
            t.string :phone, index: { unique: true }
            t.string :session_token, null: false, index: { unique: true }
            t.string :password_digest, null: false

            t.timestamps
        end
    end
end
