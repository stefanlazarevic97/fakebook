# == Schema Information
#
# Table name: posts
#
#  id         :bigint           not null, primary key
#  author_id  :bigint           not null
#  body       :text             not null
#  created_at :datetime         not null
#  updated_at :datetime         not null

class Post < ApplicationRecord
    validates :body, presence: true

    belongs_to :author,
        foreign_key: :author_id,
        class_name: :User

    has_many :comments,
        foreign_key: :post_id,
        dependent: :destroy

    has_many_attached :photos
end
