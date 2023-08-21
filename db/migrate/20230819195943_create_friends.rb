class CreateFriends < ActiveRecord::Migration[7.0]
    def change
        create_table :friendships do |t|
            t.references :user, null: false, foreign_key: true, index: false
            t.references :friend, null: false, foreign_key: { to_table: :users }
            t.string :status, null: false, default: 'pending'
            t.index [:user_id, :friend_id], unique: true
            t.timestamps
        end
    end
end
