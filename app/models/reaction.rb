# == Schema Information
#
# Table name: reactions
#
#  id             :bigint           not null, primary key
#  reactor_id     :bigint           not null
#  reactable_type :string           not null
#  reactable_id   :bigint           not null
#  reaction_type  :string           not null
#  created_at     :datetime         not null
#  updated_at     :datetime         not null

class Reaction < ApplicationRecord
    belongs_to :reactor
    belongs_to :reactable, polymorphic: true
    validates :reactor_id, uniqueness: { scope: [:reactable_type, :reactable_id], message: "can only react once" }
end
