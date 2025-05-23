# frozen_string_literal: true

Devise.setup do |config|
  config.mailer_sender = 'please-change-me-at-config-initializers-devise@example.com'

  require 'devise/orm/active_record'

  config.case_insensitive_keys = [:email]
  config.strip_whitespace_keys = [:email]

  config.skip_session_storage = [:http_auth]

  config.stretches = Rails.env.test? ? 1 : 12
  config.reconfirmable = true
  config.expire_all_remember_me_on_sign_out = true
  config.password_length = 6..128
  config.email_regexp = /\A[^@\s]+@[^@\s]+\z/
  config.reset_password_within = 6.hours
  config.sign_out_via = :delete

  # ✅ JWT設定
  config.jwt do |jwt|
    jwt.secret = Rails.application.credentials.dig(:devise, :jwt_secret_key) || 'dummy_secret_for_development'

    jwt.dispatch_requests = [
      ['POST', %r{^/login$}]
    ]

    jwt.revocation_requests = [
      ['DELETE', %r{^/logout$}]
    ]

    jwt.expiration_time = 1.day.to_i
  end

  # ✅ APIモードではセッションを完全無効化
  Warden::Manager.after_set_user except: :fetch do |record, warden, _options|
    warden.request.session_options[:skip] = true if warden.authenticated?
  end

  # ✅ セッション不要なので自動ログインもオフ
  config.sign_in_after_reset_password = false
  config.sign_in_after_change_password = false

  # ✅ APIではリダイレクト不要（HTMLレスポンス抑制）
  config.navigational_formats = []

  config.responder.error_status = :unprocessable_entity
  config.responder.redirect_status = :see_other
end
