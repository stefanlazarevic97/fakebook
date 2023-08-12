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
        phone: true
    validates :password, length: { in: 6..255 }, allow_nil: true

    before_validation :ensure_session_token

    def self.find_by_credentials(credential, password)
        field = credential =~ URI::MailTo::EMAIL_REGEXP ? :email : :phone
        user = User.find_by(field => credential)
        user&.authenticate(password)
    end

    def reset_session_token!
        self.update!(session_token: generate_session_token)
        self.session_token
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
