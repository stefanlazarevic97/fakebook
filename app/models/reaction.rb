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
    belongs_to :reactor, class_name: :User
    belongs_to :reactable, polymorphic: true
    validate :uniqueness_validation

    def uniqueness_validation
        if Reaction.where(reactor_id: reactor_id, reactable_type: reactable_type, reactable_id: reactable_id, reaction_type: reaction_type).exists?
            errors.add(:reactor_id, "can only react once")
        end
    end
end
