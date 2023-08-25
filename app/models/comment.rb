# == Schema Information
#
# Table name: comments
#
#  id                :bigint           not null, primary key
#  body              :text             not null
#  commenter_id      :bigint           not null
#  post_id           :bigint           not null
#  parent_comment_id :bigint
#  created_at        :datetime         not null
#  updated_at        :datetime         not null

class Comment < ApplicationRecord
    belongs_to :commenter, class_name: :User
    belongs_to :post

    belongs_to :parent_comment,
        class_name: :Comment,
        optional: true

    has_many :child_comments, 
        foreign_key: :parent_comment_id, 
        class_name: :Comment, 
        dependent: :destroy

    validates :body, presence: true
    
    has_many :reactions,
        as: :reactable,
        dependent: :destroy

    has_one_attached :photo
end
