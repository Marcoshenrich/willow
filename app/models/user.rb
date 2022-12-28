class User < ApplicationRecord
  has_secure_password

  validates :username, :email, :session_token, presence: true
  validates :username, length: { in: 3..30 }, format: { without: URI::MailTo::EMAIL_REGEXP, message:  "can't be an email" }, uniqueness: true
  validates :email, length: { in: 3..255 }, format: { with: URI::MailTo::EMAIL_REGEXP }, uniqueness: true
  validates :password, length: { in: 6..255 }, allow_nil: true
  validates :session_token, uniqueness: true

  before_validation :ensure_session_token

  def self.find_by_credentials(credential, password)
    user = nil
    if URI::MailTo::EMAIL_REGEXP.match(credential)
      user = User.find_by(email: credential)
    else
      user = User.find_by(username: credential)
    end

    if user && user.authenticate(password) 
        user
    else
        nil
    end
  end

  def reset_session_token!
    self.session_token = generate_unique_session_token
    self.save!
    self.session_token
  end


  private

  def generate_unique_session_token
    token = 0
    loop do
      token = SecureRandom.urlsafe_base64
      break unless User.exists?(session_token: token)
    end
    token
  end

  def ensure_session_token
    self.session_token ||= self.generate_unique_session_token
  end

end
