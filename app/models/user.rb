# == Schema Information
#
# Table name: users
#
#  id              :bigint           not null, primary key
#  first_name      :string           not null
#  last_name       :string           not null
#  bio             :text
#  email           :string
#  phone           :string
#  session_token   :string           not null
#  password_digest :string           not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null

class User < ApplicationRecord
    has_secure_password

    validates :first_name, length: { in: 1..30 }
    validates :last_name, length: { in: 1..30 }
    validates :email, 
        uniqueness: true, 
        presence: true, unless: -> (user) { user.phone.present? },
        format: { with: URI::MailTo::EMAIL_REGEXP }
    validates :phone, 
        uniqueness: true, 
        presence: true, unless: -> (user) { user.email.present? },
        format: { with: /\A\d{10}\z/, message: "must be a 10-digit number" }
    validates :password, length: { in: 6..255 }, allow_nil: true

    before_validation :ensure_session_token

    has_many :posts,
        foreign_key: :author_id,
        class_name: :Post,
        dependent: :destroy

    has_many :friendships,
        dependent: :destroy

    has_many :friends,
        through: :friendships,
        source: :friend

    has_many :friends_posts,
        through: :friends,
        source: :posts  

    has_many :comments,
        foreign_key: :commenter_id,
        dependent: :destroy 

    has_one_attached :profile_picture
    has_one_attached :cover_photo
        
    def self.find_by_credentials(credential, password)
        field = credential =~ URI::MailTo::EMAIL_REGEXP ? :email : :phone
        user = User.find_by(field => credential)
        user&.authenticate(password)
    end

    def reset_session_token!
        self.update!(session_token: generate_session_token)
        self.session_token
    end

    def is_friend?(user)
        friend_ids = self.friends.map{ |friend| friend.id }
        friend_ids.include?(user.id)
    end

    def mutual_friends(other_user)
        return -1 if self.id == other_user.id
        friends_hash = {}
        count = 0

        self.friends.each { |friend| friends_hash[friend.id] = true }
        other_user.friends.each { |friend| count += 1 if friends_hash[friend.id] }

        count
    end

    def self.search(query)
        where("first_name ILIKE ? OR last_name ILIKE ?", "%#{query}%", "%#{query}%")
    end

    private 

    def generate_session_token
        token = SecureRandom::urlsafe_base64
        token = SecureRandom::urlsafe_base64 while User.exists?(session_token: token)
        token
    end

    def ensure_session_token
        self.session_token ||= generate_session_token
    end
end
