# frozen_string_literal: true

class ApplicationController < ActionController::Base
  around_action :switch_locale

  def switch_locale(&action)
    locale = extract_locale_from_tld || I18n.default_locale
    I18n.with_locale(locale, &action)
  end
  
  def set_csrf_token_header
    response.set_header('X-CSRF-Token', form_authenticity_token)
  end

  def extract_locale_from_tld
    parsed_locale = request.host.split('.').last
    I18n.available_locales.map(&:to_s).include?(parsed_locale) ? parsed_locale : nil
  end
end
