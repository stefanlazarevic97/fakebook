# == Schema Information
#
# Table name: friends
#
#  id         :bigint           not null, primary key
#  user_id    :integer          not null
#  friend_id  :integer          not null
#  status     :string           default("pending"), not null
#  created_at :datetime         not null
#  updated_at :datetime         not null

class Friend < ApplicationRecord
    belongs_to :user

    belongs_to :friend,
        foreign_key: :friend_id,
        class_name: :User

    validates :user_id, :friend_id, presence: true
    validates :user_id, uniqueness: { scope: :friend_id }
    validates :status, inclusion: { in: %w(pending accepted) }

    
end
