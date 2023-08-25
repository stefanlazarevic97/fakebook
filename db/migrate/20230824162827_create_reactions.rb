class CreateReactions < ActiveRecord::Migration[7.0]
    def change
        create_table :reactions do |t|
            t.references :reactor, null: false, index: true, foreign_key: { to_table: :users }
            t.references :reactable, polymorphic: true, null: false
            t.string :reaction_type, null: false
            t.timestamps
        end
    end
end
