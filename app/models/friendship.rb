# == Schema Information
#
# Table name: friendships
#
#  id         :bigint           not null, primary key
#  user_id    :integer          not null
#  friend_id  :integer          not null
#  status     :string           default("pending"), not null
#  created_at :datetime         not null
#  updated_at :datetime         not null

class Friendship < ApplicationRecord
    belongs_to :user

    belongs_to :friend,
        foreign_key: :friend_id,
        class_name: :User

    validates :user_id, :friend_id, presence: true
    validate :not_self
    validates :user_id, uniqueness: { scope: :friend_id }
    validates :status, inclusion: { in: %w(pending accepted) }

    def not_self
        if user_id == friend_id
            errors.add(:friend_id, "can't be the same as the user")
        end
    end
end
