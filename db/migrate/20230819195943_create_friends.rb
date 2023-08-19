class CreateFriends < ActiveRecord::Migration[7.0]
    def change
        create_table :friendships do |t|
            t.integer :user_id, null: false, index: true
            t.integer :friend_id, null: false, index: true
            t.string :status, null: false, default: 'pending'
            t.timestamps
        end
    end
end
