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
    # belongs_to :parent_comment

    validates :body, presence: true
end
